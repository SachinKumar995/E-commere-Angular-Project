import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {cart, priceSummary} from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[] |undefined;
  priceSummary :priceSummary={
    price :0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
constructor( private product:ProductService,private router :Router){

}
ngOnInit(): void {
   this.currentData();
}
checkoutfun(){
  this.router.navigate(['/checkout'])
}
sachin(cartId:number|undefined){
  cartId&& this.cartData && this.product.removeToCart(cartId)
  .subscribe((result)=>{
    this.currentData();
})
}
currentData(){
  this.product.currentCart().subscribe((result)=>{
    this.cartData=result;
    console.warn(this.cartData);
    let Price = 0;
    result.forEach((item)=>{
      if(item.quantity){
      const itemPrice = (+item.price* +item.quantity);
      if (!isNaN(itemPrice)) { // Check if item.price is a valid number
        Price =Price+ itemPrice;
      }
    }
    });
    console.warn("price is " + Price);
    this.priceSummary.price = Price 
    this.priceSummary.discount=Price/10;
    this.priceSummary.tax=Price/10;
    this.priceSummary.delivery=100;
    this.priceSummary.total=Price+(Price/10)+100-(Price/10);
    console.warn(this.priceSummary);
    if(!this.cartData.length){
      this.router.navigate(['/'])
    }
  })
}
}

