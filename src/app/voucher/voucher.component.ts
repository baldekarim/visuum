import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  exchangeRate = 0
  exchangeRateView = ''
  quantitySetByUser = '100'
  selectedQuantity = 100
  minimumAmountToSend = 20
  amount = 100.00
  withdrawalsPlace = []
  selectedWithdrawalId = 0
  amountGnf = 0
  amountGnfView = ''
  shipmentRate = 0.05
  shipment = 0.0
  shipmentView = ''
  totalAmount = 0
  totalAmountView = ''
  displaySummary = false
  
  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
    this.updateExchangeRate()
    this.getWithdrawalsPlaces()
  }

  updateExchangeRate() {
    this.dbService.getEurGnfExchangeRate().subscribe(
      data => {
        this.exchangeRate = parseInt(data.exchange_rate)
        this.exchangeRateView = this.exchangeRate.toLocaleString('fr')
      }
    )
  }

  getWithdrawalsPlaces() {
    this.dbService.getWithdrawals().subscribe(data => {
      this.withdrawalsPlace = data.withdrawals
    })
  }

  replaceCommaInQuantity() {
    if (this.quantitySetByUser.includes(',')) {
      this.quantitySetByUser = this.quantitySetByUser.replace(',', '.')
    }
  }

  updateQuantity() {
    this.replaceCommaInQuantity()
    let q = parseInt(this.quantitySetByUser)
    if (q && q > 0) {
      this.selectedQuantity = q
    } else {
      this.selectedQuantity = 0
    }
    this.updateAmount()
    this.prepareOrder()
  }

  increment() {
    this.replaceCommaInQuantity()
    this.quantitySetByUser = parseFloat(this.quantitySetByUser) + 1 + ''
    this.updateQuantity()
  }

  decrement() {
    let parsedQuantity = parseFloat(this.quantitySetByUser)
    if (parsedQuantity > this.minimumAmountToSend) {
      parsedQuantity --
      this.quantitySetByUser = parsedQuantity + ''
      this.updateQuantity()
    }
  }

  updateAmount() {
    this.amount = this.selectedQuantity * 1.00
  }

  updateSelectedWithdrawal(data) {
    this.selectedWithdrawalId = data
    this.prepareOrder()
  }

  prepareOrder() {
    if (this.amount > 0 && this.selectedWithdrawalId) {
      this.displaySummary = true
      this.amountToSend()
      this.getShippingAmount()
      this.totalAmount = this.amount + this.shipment
      this.totalAmountView = this.totalAmount.toLocaleString('fr')
    } else {
      this.displaySummary = false
    }
  }

  amountToSend() {
    this.amountGnf = this.amount * this.exchangeRate
    this.amountGnfView = this.amountGnf.toLocaleString('fr')
  }

  getShippingAmount() {
    this.shipment = this.amount * this.shipmentRate
    this.shipmentView = this.shipment.toFixed(2)
  }

  validateOrder() {
    console.log('Prepare for next step ...')
    console.log('Post in database at transaction_details table the following informations : ')

    let transaction = {
      'withdrawal_id': this.selectedWithdrawalId,
      'number_of_vouchers': this.selectedQuantity,
      'exchange_rate': this.exchangeRate,
      'amount_gnf': this.amountGnf,
      'shipping': this.shipment,
      'total_amount': this.totalAmount, 
      'recipient_selected': -1, 
      'transaction_reference': ''
    }

    this.dbService.initiateUserTransaction(transaction)

    if (this.dbService.isUserLoggedIn()) {
      this.router.navigate(['/beneficiaire'])
    } else {
      //this.router.navigateByUrl('/connexion?redirect=/test')
      this.dbService.updateRedirectToRecipient()
      this.router.navigate(['/connexion'])
    }
  }
  
}
