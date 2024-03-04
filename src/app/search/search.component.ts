import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:ActivatedRoute,private pro:ProductService) { 
  }
  result:undefined |product[];

  ngOnInit(): void {
      let query1=this.route.snapshot.paramMap.get('query');
      query1 && this.pro.searchProduct(query1).subscribe((data)=>{
      if(data){
        this.result=data;
      }
      })
  }
   
   
 
}
