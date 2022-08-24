import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account/account.component';
import { AddressComponent } from './components/account/address/address.component';
import { CommentComponent } from './components/account/comment/comment.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { UserInformationComponent } from './components/account/user-information/user-information.component';
import { AddImagesComponent } from './components/add-images/add-images.component';
import { BasketComponent } from './components/basket/basket.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyFavoriteProductsComponent } from './components/my-favorite-products/my-favorite-products.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductaddComponent } from './components/productAdd/productadd.component';
import { ProductfeaturesComponent } from './components/productfeatures/productfeatures.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  {path:"product/addfeatures",component:ProductfeaturesComponent},
  {path:"product/add",component:ProductaddComponent},
  {path:"myproducts",component:MyProductsComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"products",pathMatch:"full",component:HomeComponent},
  {path:"product/detail/:productId/:color",component:DetailProductComponent}, 
  {path:"addimage",component:AddImagesComponent},
  {path:"favorites",component:MyFavoriteProductsComponent,canActivate:[LoginGuard]},
  {path:"basket",component:BasketComponent,canActivate:[LoginGuard]},
  {path:"account",component:AccountComponent,canActivate:[LoginGuard],children:[
    {path:"",component:UserInformationComponent,},
    {path:"information",component:UserInformationComponent,canActivate:[LoginGuard]},
    {path:"address",component:AddressComponent,canActivate:[LoginGuard]},
    {path:"comments",component:CommentComponent,canActivate:[LoginGuard]},
    {path:"orders",component:OrdersComponent,canActivate:[LoginGuard]},]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
