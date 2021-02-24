
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vsm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  img_Slide1 = "https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
  img_Slide2 = "https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
  img_Slide3 = "https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"

  constructor() { }

  ngOnInit() {
  }

}