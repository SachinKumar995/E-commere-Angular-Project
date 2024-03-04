import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignUp } from '../data-type';
import {login } from '../data-type'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  
  isloginerror=new EventEmitter<boolean>(false);
  
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userlogin(data: login) {
    console.warn(data); // Logging the login data
    
    // Making the API call with interpolated values for email and password
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.warn(result); // Logging the response from the server
      // Handle the response or further actions here
      if(result && result.body && result.body.length){
        console.warn('login Successful');
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }else{
        console.warn('login fails');
        this.isloginerror.emit(true);
      }
    });
  }
  }
