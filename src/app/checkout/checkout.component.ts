import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  recipientId = -1
  transactionDetail = []
  transactionComplete = false
  transactionReference = ''

  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
  }

  createTransaction() {
    this.transactionReference = this.generateTransactionReference()
    this.dbService.userTransactionInfo.transaction_reference = this.transactionReference
    const vsmToken = JSON.parse(localStorage.getItem('vsm-token')).token
    this.dbService.addTransaction(vsmToken).subscribe(
      data => { 
        this.transactionComplete = true
        setTimeout(() => this.router.navigate(['/']), 10000)
      }
    )
  }

  generateTransactionReference() {
    let today = new Date()
    let year = today.getFullYear().toString().substring(2)
    let month = (today.getMonth() + 1).toString().length == 1 ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()
    let day = today.getDate().toString().length == 1 ? '0' + today.getDate().toString() : today.getDate().toString()     
    let hour = today.getHours().toString().length == 1 ? '0' + today.getHours().toString() : today.getHours().toString()
    let minutes = today.getMinutes().toString().length == 1 ? '0' + today.getMinutes().toString() : today.getMinutes().toString()
    let randFirst = Math.floor(Math.random() * Math.floor(9))
    let randSecond = Math.floor(Math.random() * Math.floor(9))
    let randThird = Math.floor(Math.random() * Math.floor(9))
    
    return 'TR-' + year + month + day + hour + minutes + randFirst + randSecond + randThird
  }

}
