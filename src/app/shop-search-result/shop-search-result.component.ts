import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../services/db.service'

@Component({
  selector: 'vsm-shop-search-result',
  templateUrl: './shop-search-result.component.html',
  styleUrls: ['./shop-search-result.component.css']
})
export class ShopSearchResultComponent implements OnInit {

  shops = []
  nbShopsFound = 0
  rows = []
  totalLines = 0;
  page = 1;
  itemsPerRow = 3;

  displayNoneResultMessage = false
  noneResultMessage = ''

  shopViewClass = ''

  paginationClass = 'pager'
  prevLabel = 'Précédent'
  nextLabel = 'Suivant'
  maxSize = 7

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dbService.searchResultSubject.subscribe(
        data => { 
          this.page = 1
          this.totalLines = 0
          this.handleSearchResult(data)
        }
      );
  }

  handleSearchResult(data) {
    if(data.success) {
      this.shops = data.shops_found
      this.nbShopsFound = this.shops.length
      this.rows = Array.from(
        Array(Math.ceil(this.nbShopsFound / this.itemsPerRow)).keys()
      );
      this.totalLines = this.rows.length;
      this.displayNoneResultMessage = false
    } else {
      this.shops = []
      this.displayNoneResultMessage = true
      this.noneResultMessage = "Aucune boutique ne correspond aux critères de votre recherche"
    }

    if(this.shops.length == 1) {
      this.shopViewClass = 'col-sm-12 col-md-12 col-lg-12 shop_item'
    } else if(this.shops.length == 2) {
      this.shopViewClass = 'col-sm-12 col-md-6 col-lg-6 shop_item'
    } else {
      this.shopViewClass = 'col-sm-12 col-md-6 col-lg-4 shop_item'
    }

    if (window.innerWidth < 768) {
      this.maxSize = 5
      this.prevLabel = ''
      this.nextLabel = ''
      if (window.innerWidth < 520) {
        this.paginationClass = 'pagination pagination-sm'
      }
    } 
  }

  onPageChange(p: number) {
    this.page = p;
    window.scrollTo(0, 0);
  }

}
