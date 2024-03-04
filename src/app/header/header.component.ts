import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

constructor(private route:Router,private search:ProductService){}
// this variable is bassically used to hide the navbar of home page.and display the navbar of seller
menuType:string="default";
// this variable is used to display the name of person who logged into seller page
sellerName:string='';
userName:string='';
serachResult:undefined | product[]
result:undefined |product[];
cartItem=0;
ngOnInit() {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      if (localStorage.getItem('seller') && val.url.includes('seller')) {
        let sellerStore = localStorage.getItem('seller');
        let sellerData = sellerStore && JSON.parse(sellerStore)[0];
        this.sellerName = sellerData.email;
        this.menuType = 'seller';
      } else if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName = userData.name;
        this.menuType = 'user';
        this.search.getCartList(userData.id)
      } else {
        this.menuType = 'default';
      }
    }
  });
let cartData=localStorage.getItem('localCart');
if(cartData){
  this.cartItem=JSON.parse(cartData).length
}
this.search.cartData.subscribe((items) => {
  this.cartItem = items.length  
})
}
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userlogout(){
  localStorage.removeItem('user');
  this.route.navigate(['/'])
  }
search_Product(query:KeyboardEvent){
  if(query){
    const element=query.target as HTMLInputElement;
    this.search.searchProduct(element.value).subscribe((result)=>{
    console.warn(result)
    this.serachResult=result;
    })
  }
}
hideSearch(){
  this.serachResult=undefined;
}
submitSearch(data:string){
 console.warn(data);
 this.route.navigate([`search/${data}`])
}
redirectToDetails(id:number){
  this.route.navigate(['/details/'+id])
}
}
