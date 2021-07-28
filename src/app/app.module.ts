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
import { ValidateUserRegistrationComponent } from './validate-user-registration/validate-user-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipientComponent } from './recipient/recipient.component';
import { LoginActivate } from './LoginActivate';
import { CheckoutComponent } from './checkout/checkout.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { TransactionReceiptComponent } from './transaction-receipt/transaction-receipt.component';

const routes = [
  { path: '', component: HomeComponent},
  { path: 'boutiques/recherche', component: ShopComponent},
  { path: 'boutiques/:name', component: ShopDetailsComponent},
  { path: 'boutiques', component: ShopComponent},
  { path: 'profil', component: ProfileComponent, canActivate: [LoginActivate]},
  { path: 'profil/edition', component: UpdateUserProfileComponent, canActivate: [LoginActivate]},
  { path: 'connexion', component: AuthenticationComponent},
  { path: 'bons-achat', component: VoucherComponent},
  { path: 'inscription', component: RegisterComponent},
  { path: 'validation-utilisateur', component: ValidateUserRegistrationComponent},
  { path: 'beneficiaire', component: RecipientComponent, canActivate: [LoginActivate]},
  { path: 'validation-bons-d-achat', component: CheckoutComponent, canActivate: [LoginActivate]},
  { path: 'recepisse/transaction/:reference', component: TransactionReceiptComponent, canActiviate: [LoginActivate]},
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
    RegisterComponent,
    ValidateUserRegistrationComponent,
    ProfileComponent,
    RecipientComponent,
    CheckoutComponent,
    UpdateUserProfileComponent,
    TransactionReceiptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DbService, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
