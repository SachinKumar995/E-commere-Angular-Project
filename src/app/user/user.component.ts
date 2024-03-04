import { Component, OnInit } from '@angular/core';
import { UserAllService } from '../services/user-all.service';
import { SignUp, login, product, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  authError: string = "";
  ngOnInit(): void {
    this.user.userAuthRelode();
  }
  constructor(private user: UserAllService, private product: ProductService) { }
  showlogin = false;
  signUpform(data: SignUp) {
    this.user.usersignup(data);
  }
  Loginform(data: login) {
    this.user.userLogin(data);
    this.user.invaliduserAuth.subscribe((result) => {
      console.warn("apple", result)
      if (result) {
        this.authError = "please enter perfect details";
      } else {
        this.localCartToRemoteCart()
      }
    })
  }
  openLogin() {
    this.showlogin = true;
  }
  opensignup() {
    this.showlogin = false;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList:product[]= JSON.parse(data);
   
     cartDataList.forEach((product:product, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.product.addToCart(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
        console.error("sachin  store data in DB");
         localStorage.removeItem('localCart')
       }
     });
    }
 
    setTimeout(() => {
     this.product.getCartList(userId)
    }, 2000);
     
   }
 }
