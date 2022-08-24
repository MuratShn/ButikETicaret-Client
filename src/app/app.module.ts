import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductaddComponent } from './components/productAdd/productadd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductfeaturesComponent } from './components/productfeatures/productfeatures.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { AddImagesComponent } from './components/add-images/add-images.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './components/ınterceptors/jwt.interceptor';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { RandomProductComponent } from './components/random-product/random-product.component';
import { AddProductFavoriteComponent } from './components/add-product-favorite/add-product-favorite.component';
import { MyFavoriteProductsComponent } from './components/my-favorite-products/my-favorite-products.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { BasketComponent } from './components/basket/basket.component';
import { UserInformationComponent } from './components/account/user-information/user-information.component';
import { SideBarComponent } from './components/account/side-bar/side-bar.component';
import { AddressComponent } from './components/account/address/address.component';
import { CommentComponent } from './components/account/comment/comment.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { AccountComponent } from './components/account/account/account.component';
import { AddAddressComponent } from './components/account/add-address/add-address.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //alert anımasyon ıcın


import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { JwtModule } from '@auth0/angular-jwt';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ProductaddComponent,
    ProductfeaturesComponent,
    MyProductsComponent,
    AddImagesComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    DetailProductComponent,
    RandomProductComponent,
    AddProductFavoriteComponent,
    MyFavoriteProductsComponent,
    CartSummaryComponent,
    BasketComponent,
    UserInformationComponent,
    SideBarComponent,
    AddressComponent,
    CommentComponent,
    OrdersComponent,
    AccountComponent,
    AddAddressComponent,
    ProductSearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("_T"),
        allowedDomains:["localhost:44338"]
      }
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("751984765373-r7tasilknj3a7l1um9b328h5d2gnfppe.apps.googleusercontent.com")
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('517652853462350')
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
