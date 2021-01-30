import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'vsm-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  shopDetails = null
  error = ''
  errorMessage = ''

  shopName = ''
  shopAddress = ''
  shopPrefecture = ''
  shopWebSite = ''
  shopFbPage = ''
  shopPhones = []
  shopMail = ''
  shopDescription = ''
  shopOpeningHours = ''
  imagesPath = []

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.dbService.getShopById(id)
                  .subscribe(
                    data => {
                      this.shopDetails = data.shop_found;
                      this.imagesPath = data.images_path.split('|||')
                      this.loadShop(this.shopDetails)
                    },
                    error => {
                      console.error('Error ', error.statusText);
                      this.error = error;
                      this.errorMessage = error.message;
                    }
                  );                 
  }

  loadShop(data) {
    this.shopName = data.name
    if(data.address && data.district) {
      this.shopAddress = [data.address, data.district].join(' - ')
    } else {
      this.shopAddress = data.address + data.district
    }
    if(data.sub_prefecture && data.prefecture) {
      this.shopPrefecture = [data.sub_prefecture, data.prefecture].join(' - ')
    } else {
      this.shopPrefecture = data.sub_prefecture + data.prefecture
    }
    this.shopWebSite = data.website
    this.shopFbPage = data.fbk_page
    if(data.phone_1) {
      this.shopPhones.push({phone_number : '(+224) ' + data.phone_1})
    }
    if(data.phone_2) {
      this.shopPhones.push({phone_number :'(+224) ' + data.phone_2})
    }
    if(data.phone_3) {
      this.shopPhones.push({phone_number :'(+224) ' + data.phone_3})
    }
    this.shopMail = data.email
    this.shopDescription = data.description
    this.shopOpeningHours = data.opening_hours
    let imgFolder = data.pictures
    this.imagesPath = this.imagesPath.map(img => imgFolder + img)
  }

}
