import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {order} from '../data-type';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit{

  constructor(private product:ProductService){}
 orderData:order[]|undefined;
  ngOnInit(): void {
      this.getOrderList();
      
  }
  cancelOrder(orderId :number|undefined){
    orderId && this.product.deleteOrder(orderId).subscribe((result)=>{
     this.getOrderList();
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
  })
}
}
