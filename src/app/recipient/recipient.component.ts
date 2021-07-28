import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {

  form: FormGroup
  hasUserARecipient = false
  recipientsList = []
  recipientsToAdd = []
  lastElementIndex = 0
  vsmToken = ''

  constructor(private formBuilder: FormBuilder, private dbService: DbService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      recipient_id: 0,
      name: '',
      phone_number: '',
    })
    this.vsmToken = JSON.parse(localStorage.getItem('vsm-token')).token
    this.lastElementIndex = this.recipientsList.length
    this.dbService.getRecipients(this.vsmToken).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    )
  }

  handleSuccess(data) {
    this.hasUserARecipient = true
    this.recipientsList = data.recipients
  }

  handleError(error) {
    console.error('error status : ', error.status)
    console.error('error message : ', error.json().message)
    this.recipientsList = []
    if (error.status == 400) this.router.navigate(['/connexion']) 
  }

  addRecipient(data) {
    console.log('data to add : ', data)
    this.recipientsList.push(data)
    this.recipientsToAdd.push(data)
    this.form.reset()
    this.lastElementIndex = this.recipientsList.length - 1
    this.dbService.addRecipient(data, this.vsmToken).subscribe(
      d => {
        data.recipient_id = d.recipient
      }
    )
    this.hasUserARecipient = true
  }

  validateRecipient(data) {
    console.log('selected recipient : ', data)
    this.dbService.updateRecipientSelected(data.recipient_selected)
    console.log('selected recipient id : ', this.dbService.recipientSelected)
    this.router.navigate(['validation-bons-d-achat'])
  }

}
