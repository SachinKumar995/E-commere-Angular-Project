import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  popularproduct:undefined | product[]
  trendy:undefined |product[]
  constructor(private prod:ProductService){
  }
  ngOnInit(){
 this.prod.popularProduct().subscribe((data)=>{
console.warn(data);
this.popularproduct=data;
 });
 this.prod.trendyProduct().subscribe((data)=>{
 this.trendy=data;
 });
 }
}
