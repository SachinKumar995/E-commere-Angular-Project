import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {order,cart} from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 totalPrice:number |undefined
 cartData:cart[]| undefined
 ordermsg:string |undefined
  constructor(private product:ProductService,private router:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      let Price = 0;
      this.cartData=result;
      result.forEach((item)=>{
        if(item.quantity){
        const itemPrice = (+item.price* +item.quantity);
        if (!isNaN(itemPrice)) { // Check if item.price is a valid number
          Price =Price+ itemPrice;
        }
      }
      });
     
      this.totalPrice=Price+(Price/10)+100-(Price/10);
      console.warn(this.totalPrice);
    })
  }
  orderNow(data:{email:string,address:string,contact:string}){
   let user =localStorage.getItem('user');
   let userId=user && JSON.parse(user).id;
   if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice:this.totalPrice,
      userId,
      id:undefined
    }
    this.cartData?.forEach((item)=>{
    setTimeout(()=>{
      this.product.deleteCartItems(item.userId)
    },800);
    })
    this.product.orderNow(orderData).subscribe((result)=>{
      if(result){
        this.ordermsg="Your order has been placed"

        setTimeout(()=>{
          this.router.navigate(['my-order'])
          this.ordermsg=undefined
        },4000);
      }
    })
   }
  }
}
