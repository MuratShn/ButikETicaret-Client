import { Component, OnInit } from '@angular/core';
import { CartDto } from 'src/app/models/CartDto';
import { CartItem } from 'src/app/models/cartıtem';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(
    private readonly cartService:CartService,
    private readonly productService:ProductService
    ) { }
  
  products:CartDto[]=[]

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.products = this.cartService.list();
  }

}
