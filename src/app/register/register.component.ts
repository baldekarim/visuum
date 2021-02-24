import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  countries = []

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dbService.getCountries().subscribe(
      data => {this.countries = data
        console.log('data : ', this.countries)}
    )
  }

}
