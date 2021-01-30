import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DbService } from './services/db.service';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ShopSearchComponent } from './shop-search/shop-search.component';
import { ShopSearchResultComponent } from './shop-search-result/shop-search-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes = [
  { path: '', component: HomeComponent},
  { path: 'shops/search', component: ShopComponent},
  { path: 'shops/:id', component: ShopDetailsComponent},
  { path: 'shops', component: ShopComponent},
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    ShopDetailsComponent,
    TruncatePipe,
    ShopSearchComponent,
    ShopSearchResultComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
