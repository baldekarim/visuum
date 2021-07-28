import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  lastName = ''
  firstName = ''
  address = ''
  city = ''
  zipCode = 0
  country = ''
  phoneNumber = ''
  transactions = []

  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
    const vsmToken = JSON.parse(localStorage.getItem('vsm-token')).token
    this.getUserInfo(vsmToken)
  }

  getUserInfo(token) {
    this.dbService.getUserInfo(token).subscribe(
      data => {
        this.lastName = data.last_name
        this.firstName = data.first_name
        this.address = data.address
        this.city = data.city
        this.zipCode = data.zip_code
        this.country = data.country
        this.phoneNumber = data.phone_number
        this.transactions = data.transactions

        console.log('transactions : ', this.transactions)
      },
      error => {
        let errorMessage = error.json().message
        if (errorMessage == "wrong token") {
          this.dbService.logOut()
          this.router.navigate(['connexion'])
        }
      }
    )
  }

}
