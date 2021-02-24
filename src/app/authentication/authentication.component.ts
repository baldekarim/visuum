import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  validEmail = false
  existingEmail = false
  validUser = false
  errorMessage = ''

  emailsList = []

  constructor(private router: Router, private dbService: DbService) { }

  ngOnInit() {
    this.dbService.getEmails().subscribe(
      data => {
        this.emailsList = data.emails_list
        console.log('Emails présents : ', this.emailsList)
        console.log('loop : ')
        this.emailsList.forEach(e => console.log(e.email))
      }
    )
  }

  actualizeErrorMessage() {
    this.errorMessage = ''
  }

  isValidEmail(email) {
    let regExp = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)
    return regExp.test(email)
  }

  isExistingEmail(email) {
    let emailFound = this.emailsList.find(el => el.email == email)
    if (emailFound) {
      this.existingEmail = true
    } else {
      this.existingEmail = false
    }
  }

  checkPassword(email, password) {
    // vérification de la correspondance email <-> password
    email = 'abc@efg.hi'
    password = '************'
    return false
  }

  checkUserIdentification(email, password) {
    this.validEmail = this.isValidEmail(email)
    if (this.validEmail) {
      this.isExistingEmail(email)
      if (this.existingEmail) {
        this.validUser = this.checkPassword(email, password)
        if (this.validUser) {
          this.router.navigate(['/profile'])
        } else {
          this.errorMessage = 'Mot de passe incorrect'
        }
      } else {
        this.errorMessage = "Il n'existe pas de compte associé à cette adresse e-mail"
      }
    } else {
      this.errorMessage = 'Adresse e-mail invalide'
    }
  }

  connection(data) {
    console.log('email : ', data.username)
    console.log('password : ', data.password)

    this.checkUserIdentification(data.username, data.password)
    
    console.log('is valid email : ', this.validEmail)
    console.log('is existing email : ', this.existingEmail)
    console.log('is valid user : ', this.validUser)
  }

}
