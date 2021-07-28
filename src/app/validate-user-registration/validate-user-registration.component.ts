import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-validate-user-registration',
  templateUrl: './validate-user-registration.component.html',
  styleUrls: ['./validate-user-registration.component.css']
})
export class ValidateUserRegistrationComponent implements OnInit {

  textMessage = ''

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(_ => this.validateUser())
  }

  private validateUser() {
    let keyUser = this.activatedRoute.snapshot.queryParams.key
    console.log("key id : ", keyUser)
    this.dbService.validateUser("key=" + keyUser).subscribe(data => { 
      if (data.success) this.textMessage = data.message
    })
  }

}
