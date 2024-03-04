import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type'; 

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{

  constructor(private pro: ProductService) {}
 message:string|undefined;
  ngOnInit(): void { 

  }
  submit(data: product):void {
    this.pro.addProduct(data).subscribe((result:any)=>{
      console.warn(result);
      if(result){
        this.message="product added sucessfully";
      }
      setTimeout(()=>(this.message=undefined),3000);
    });
  
  }
}