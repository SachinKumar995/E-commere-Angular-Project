import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
import { login } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller: SellerService) {}
  showlogin=false;
  authError:String='';
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: SignUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: login): void{
    // console.warn(data);
    this.seller.userlogin(data);
    this.seller.isloginerror.subscribe((error)=>{
      if(error){
       this.authError="Email or Password is not correct";
      }
      });
  }
  openlogin(){
  this.showlogin=true;
  }
  opensignup(){
    this.showlogin=false;
  }
  }
