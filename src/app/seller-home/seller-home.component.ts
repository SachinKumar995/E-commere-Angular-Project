import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

constructor(private list:ProductService){}
arr:undefined | product[];
msg:undefined|string;
icon1=faTrash;
edit1=faEdit;
ngOnInit(): void {
    this.list1();
}
delete(id:number){
 console.warn("test id",id);
 this.list.deleteList(id).subscribe((result)=>{
 if(result){
 this.msg="product deleted successfully";
 this.list1();
 }
 })
 setTimeout(()=>(this.msg=undefined),3000);
}
list1(){
  this.list.productList().subscribe((result)=>{
    console.warn(result);
    this.arr=result;
})
}
}
