import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
 
  constructor(private route:ActivatedRoute,private product:ProductService) {
  }
  answer:undefined |product;
  ans:number=1;
  removeCart=false;
  cartData:product|undefined;
  ngOnInit(): void {

      let productId=this.route.snapshot.paramMap.get('productId');
       console.warn("product Id is this",productId);
       productId && this.product.getproductid(productId).subscribe((data)=>{
       console.warn("this is data",data);
       this.answer=data;

      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
        let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }
    })
    
  }
  myproduct(val:string){
   if( this.ans<20 && val=='plus'){
    this.ans+=1;
   }else if(this.ans>1 && val=='minus'){
    this.ans-=1;
   }
  }
  AddToCart(){
    if(this.answer){
    this.answer.quantity=this.ans;
    if(!localStorage.getItem('user')){
     console.warn("sachin mishra",this.answer);
     this.product.localAddToCart(this.answer);
     this.removeCart=true;
   }else{
    console.warn("user is logged in");
    let user1 = localStorage.getItem('user');
    let userId= user1 && JSON.parse(user1).id;
    console.warn("user id is ",userId);
    let cartData:cart={
      ...this.answer,
      userId,
      productId:this.answer.id,
    }
    delete cartData.id
    console.warn(cartData);
    this.product.addToCart(cartData).subscribe((result)=>{
      if(result){
        this.product.getCartList(userId);
        this.removeCart=true;
      }
    })
   }
    }
  }
  
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
this.product.removeItemFromCart(productId)
    }else{
      console.warn("cartData", this.cartData);
      
      this.cartData && this.product.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false
  }
}
