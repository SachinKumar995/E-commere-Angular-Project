import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAllService {
 
  invaliduserAuth=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
  usersignup(data:SignUp){
  return this.http.post("http://localhost:3000/user",data,{observe:'response'})
  .subscribe((result)=>{
  console.warn(result);
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body))
    this.router.navigate(['/']);
  }
  })
  }
  userAuthRelode(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  userLogin(data:login){
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{ observe: 'response' }).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }else{
        this.invaliduserAuth.emit(true)
      }
  })
  }
}
