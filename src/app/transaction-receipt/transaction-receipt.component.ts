import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service'
import * as jspdf from 'jspdf'

@Component({
  selector: 'vsm-transaction-receipt',
  templateUrl: './transaction-receipt.component.html',
  styleUrls: ['./transaction-receipt.component.css']
})
export class TransactionReceiptComponent implements OnInit {

  userFirstName = ''
  userLastName = ''
  userPhoneNumber = ''
  userEmail = ''
  transactionDate = ''
  transactionReference = ''
  transactionAmount = ''
  amountGnf = ''
  shipping = ''
  totalAmount = ''
  recipientName = ''
  recipientPhoneNumber = ''
  withdrawalName = ''
  withdrawalPhoneNumber = ''
  withdrawalManager = ''
  withdrawalEmail = ''

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const reference = this.activatedRoute.snapshot.params.reference
    const vsmToken = JSON.parse(localStorage.getItem('vsm-token')).token
    console.log('reference transaction : ', reference)
    this.dbService.getTransactionByReference(reference, vsmToken).subscribe(
      data => this.handleSuccess(data[0]),
      error => this.handleError(error)
    )
  }

  @ViewChild('content') content: ElementRef;

  handleError(error) {
    const serverErrorMessage = error.json().message
    if (serverErrorMessage == 'wrong token') {
      this.router.navigate(['connexion'])
    }
  }

  handleSuccess(data) {
    this.userFirstName = data.user_first_name
    this.userLastName = data.user_last_name
    this.userPhoneNumber = data.user_phone_number
    this.userEmail = data.user_email
    this.transactionDate = data.transaction_date
    this.transactionReference = data.transaction_reference
    this.transactionAmount = data.number_of_vouchers
    this.amountGnf = data.amount_gnf.toLocaleString('fr')
    this.shipping = data.shipping
    this.totalAmount = data.total_amount
    this.recipientName = data.recipient_name
    this.recipientPhoneNumber = data.recipient_phone_number
    this.withdrawalName = data.withdrawal_name
    this.withdrawalPhoneNumber = data.withdrawal_phone_number
    this.withdrawalManager = data.withdrawal_manager
    this.withdrawalEmail = data.withdrawal_email
  }

  makePdf() {
    /*
    let doc = new jspdf('p','pt','a4');
    doc.addHTML(this.content.nativeElement, function() {
      doc.save("recepisse-transaction-visuum.pdf");
    });
    */
  }

}
