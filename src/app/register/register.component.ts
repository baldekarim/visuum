import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  countries = []
  errorMessage = ''
  isRegistrationComplete = false
  userEmail = ''

  constructor(private formBuilder: FormBuilder, private router: Router, private dbService: DbService) { }

  ngOnInit() {
    if (this.dbService.isUserLoggedIn()) this.router.navigate(['/profil'])

    this.form = this.formBuilder.group({
      last_name: '',
      first_name: '',
      country: '',
      phone_number: '',
      address: '',
      city: '',
      zipcode: 75,
      email: '',
      password: ''
    })

    this.dbService.getCountries().subscribe(
      data => this.countries = data
    )
  }

  actualizeErrorMessage() {
    this.errorMessage = ''
  }

  addUserInDb(user) {
    this.dbService.addUser(user).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    )
  }

  handleSuccess(data) {
    this.isRegistrationComplete = true
    window.scroll(0, 0)
    setTimeout(() => this.router.navigate(['/']), 5000)
  }

  handleError(error) {
    let requestStatus = error.status
    let serverErrorMessage = error.json().message
    if (requestStatus == 400) {
      if (serverErrorMessage == 'email is not valid') this.errorMessage = "Adresse mail invalide"
      else if (serverErrorMessage == 'password invalid') this.errorMessage = "Le mot de passe doit avoir au moins 8 caractères dont une lettre et un chiffre"
      else if (serverErrorMessage == 'password and confirmation do not match') this.errorMessage = "Le mot de passe et sa confirmation doivent être identiques"
    } else if (requestStatus == 409) {
      if (serverErrorMessage == 'user already exist') this.errorMessage = "Cette adresse mail existe déjà"
      else if (serverErrorMessage == 'user exist but not yet active') this.errorMessage = "Cette adresse mail a déjà été utilisée mais n'est pas encore validé. " +
                                                                                          "Pour le faire connectez-vous à votre messagerie électronique !"
    } 
  }

  register(data) {
    console.log('Nom : ', data.last_name)
    console.log('Prénom : ', data.first_name)
    console.log('Pays : ', data.country)
    console.log('Numéro de téléphone : ', data.phone_number)
    console.log('Adresse : ', data.address)
    console.log('Ville : ', data.city)
    console.log('Code Postal : ', data.zipcode)
    console.log('Email : ', data.email)
    console.log('Mot de passe : ', data.password)
    console.log('Confirmation mot de passe : ', data.confirm_password)

    this.addUserInDb(data)
  }
}
