import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  constructor(private route: ActivatedRoute,private product :ProductService) { }
  getproductdata:undefined |product
  msz1:undefined | String;

   ngOnInit(): void { 
   let productId=this.route.snapshot.paramMap.get('id');
   console.warn("product id is ",productId);
   // if i dont use productId along with && then i will get error. because productId might be null.
   productId && this.product.getproductid(productId).subscribe((data)=>{
    //  console.warn(data);
     this.getproductdata=data;
   })
   }
   submit(data:any){ 
    if (this.getproductdata) {
      data.id = this.getproductdata.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
     if(result){
      this.msz1="Product updated Successfully";
     }
    });
    setTimeout(()=>{
      this.msz1=undefined;
    },3000);
    
   }
}

