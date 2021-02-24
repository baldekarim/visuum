import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'vsm-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.css']
})
export class ShopSearchComponent implements OnInit {

  typesOfShops = [
    { id: 1, name: 'Alimentation & Restauration'},
    { id: 2, name: 'Textile, Habillemement, Chaussures & Bijoux'},
    { id: 3, name: 'Vente en ligne'},
    { id: 4, name: 'Transport et Logistique'},
    { id: 5, name: 'BTP & Matériaux de construction'},
    { id: 6, name: 'Electronique, Télécom & IT'},
    { id: 7, name: 'Commerce Générale & Distribution'}
  ]

  shops = []

  searchText = ''
  categoryText = ''
  nameText = ''
  locationText = ''
  displaySearchText = false

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(_ => this.filterShopsOnModifyingUrl())
  }

  filterShops(value) {
    let urlPath = '/boutiques/recherche?'
    let categoryTerm = ''
    let nameTerm = ''
    let locationTerm = ''

    

    if(value.shop_type) {
     categoryTerm = 'categorie=' + value.shop_type
    }
    if(value.shop_name) {
      nameTerm = 'nom=' + value.shop_name
    }
    if(value.location) {
      locationTerm = 'localisation=' + value.location
    }

    urlPath +=  [categoryTerm, nameTerm, locationTerm].filter(Boolean).join('&')

    this.router.navigateByUrl(urlPath)
  }
  
  private filterShopsOnModifyingUrl() {
    let category = this.activatedRoute.snapshot.queryParams.categorie
    const name = this.activatedRoute.snapshot.queryParams.nom
    const location = this.activatedRoute.snapshot.queryParams.localisation

    console.log('catégorie : ', category)
    if(!category) {
      category = 0
    } else {
      if(category == 0) {
        this.categoryText = ' de toutes catégories'
      } else {
        this.categoryText = ' de catégorie "' + this.typesOfShops.find(ts => ts.id == category)["name"] + '"'
      }
    }

    let urlArgs = 'categorie=' + category
    
    if(name) {
      urlArgs += '&nom=' + name
      this.nameText = ' << ' + name + ' >>'
    }
    if(location) {
      urlArgs += '&localisation=' + location
      this.locationText = ' à ' + location
    }

    if(category || name || location) {
      this.searchText = 'Résultats de votre recherche des boutiques' + this.nameText + this.categoryText + this.locationText
    }

    this.launchQuery(urlArgs)
  }

  private launchQuery(urlArgs) {
    this.dbService.getShopsByUrl(urlArgs)
                  .subscribe(
                    data => {
                      this.shops = data; 
                      if(data.success) {
                        this.displaySearchText = true
                      } else {
                        this.displaySearchText = false
                      }
                    },
                    error => console.error(error)
                  )
  }

}
