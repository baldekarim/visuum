import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'vsm-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  shopDetails = null
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
  imgSrcFolder = 'src/assets/images/shops'

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    const name = this.activatedRoute.snapshot.params.name;
    this.dbService.getShopByName(name)
                  .subscribe(
                    data => {
                      this.handleSuccess(data)
                    },
                    error => {
                      this.handleError(error)
                    }
                  );                 
  }

  handleSuccess(data) {
    this.shopDetails = data.shop_found;
    this.imagesPath = data.images_path.split('|||')
    this.loadShop(this.shopDetails)
  }

  handleError(error) {
    this.errorMessage = error.message;
    console.log('error message : ', this.errorMessage)
    if (error.status == 404) {
      console.log('Page inexistante')
    }
    //this.router.navigate(['page-inexistante'])
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
    this.imagesPath = this.imagesPath.map(img => this.imgSrcFolder + imgFolder + img)
  }

}
