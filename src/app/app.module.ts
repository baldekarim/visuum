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
import { VoucherComponent } from './voucher/voucher.component';
import { AmountConverterPipe } from './pipes/amount-converter.pipe';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';

const routes = [
  { path: '', component: HomeComponent},
  { path: 'boutiques/recherche', component: ShopComponent},
  { path: 'boutiques/:name', component: ShopDetailsComponent},
  { path: 'boutiques', component: ShopComponent},
  { path: 'bons-achat', component: VoucherComponent},
  { path: 'connexion', component: AuthenticationComponent},
  { path: 'inscription', component: RegisterComponent},
  { path: '**', component: PageNotFoundComponent }
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
    PageNotFoundComponent,
    VoucherComponent,
    AmountConverterPipe,
    AuthenticationComponent,
    RegisterComponent
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
