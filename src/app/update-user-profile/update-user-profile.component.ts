import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'vsm-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {

  countries = []
  setPassword = false
  setText = ''
  errorMessage = ''
  updateCategory = ''
  updateComplete = false

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.dbService.getCountries().subscribe(
      data => this.countries = data
    )
    this.updateCategory = this.activatedRoute.snapshot.queryParams.q
    if (this.updateCategory == "adresse") {
      this.setPassword = false
      this.setText = 'adresse'
    } else if (this.updateCategory == "pass") {
      this.setPassword = true
      this.setText = 'mot de passe'
    }
  }

  updateUser(data) {
    const vsmToken = JSON.parse(localStorage.getItem('vsm-token')).token
    if (this.updateCategory == "adresse") {
      this.dbService.updateAddress(data, vsmToken).subscribe(
        data => this.redirectToProfile()
      )
    } else if (this.updateCategory == "pass") {
      this.dbService.updatePassword(data, vsmToken).subscribe(
        data => this.redirectToProfile(),
        error => this.handleError(error)
      )
    } else this.updateComplete = false
  }

  redirectToProfile() {
    this.updateComplete = true
    setTimeout(() => this.router.navigate(['profil']), 5000)
  }

  actualizeErrorMessage() {
    this.errorMessage = ''
  }

  handleError(error) {
    const serverErrorMessage = error.json().message
    if (error.status == 400) {
      if (serverErrorMessage == "wrong token") this.router.navigate(['connexion'])
      else if (serverErrorMessage == "missing parameters") this.errorMessage = "Vous devez renseigner tous les paramètres !"
      else if (serverErrorMessage.startsWith('password invalid'))
        this.errorMessage = "Mot de passe invalide ! Il doit avoir au moins 8 caractères, dont une lettre et un chiffre"
      else if (serverErrorMessage == "password and confirmation do not match")
        this.errorMessage = "Le mot de passe et sa confirmation ne correspondent pas !"
    } else if (error.status == 403 && serverErrorMessage == 'invalid password') this.errorMessage = 'Mot de passe incorrect'
  }

}
