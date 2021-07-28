import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  errorMessage = ''
  vsmToken = null
  displayAuthenticationForm = true
  isPasswordForgotten = false
  mailForNewPassword = false

  constructor(private router: Router, private dbService: DbService) { }

  ngOnInit() {
    if (this.dbService.isUserLoggedIn()) this.displayAuthenticationForm = false
    else this.displayAuthenticationForm = true
  }

  actualizeErrorMessage() {
    this.errorMessage = ''
  }

  connection(data) {
    this.dbService.connection(data).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    )
  }

  handleSuccess(data) {
    this.vsmToken = data
    this.displayAuthenticationForm = false
    localStorage.setItem('vsm-token', JSON.stringify(data))
    if (this.dbService.redirectToRecipient) {
      this.router.navigate(['/beneficiaire'])
    } else this.router.navigate(['/profil'])
  }

  handleError(error) {
    let requestStatus = error.status
    if (requestStatus == 400) this.errorMessage = "Paramètre manquant" 
    else if (requestStatus == 404) this.errorMessage = "Il n'existe pas de compte associé à cette adresse e-mail"
    else if (requestStatus == 403) this.errorMessage = "Mot de passe incorrect"
  }

  passwordForgotten() {
    this.isPasswordForgotten = true
    this.displayAuthenticationForm = false
  }

  reinitializePassword(data) {
    this.dbService.updateForgottenPassword(data).subscribe(
      d => { 
        console.log('result server data : ', d)
        this.mailForNewPassword = true
        this.isPasswordForgotten = false 
      },
      error => {
        let serverErrorMessage = error.json().message
        if (serverErrorMessage == 'email is not valid') this.errorMessage = 'Adresse mail invalide'
        else if (serverErrorMessage == 'user not exist') this.errorMessage = "Cette adresse mail n'existe pas. Vous devez vous inscrire"
      }
    )
  }

}
