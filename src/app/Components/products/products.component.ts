import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  token=localStorage.getItem('token');
  result:any;
  value:any;

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    const headers = { 'Authorization': `Bearer ${this.token}`}
    this.http.get<any>('http://localhost:3000/api/v1/products', { headers }).subscribe(data => {
        this.result = data;
    })
    //console.log(this.result);
  }


  onOrderPlaced(value:any){
    console.log(value);
    if(value.length> 0){
      this.router.navigateByUrl('/home/orders',{state:{data:value}});
    }

  }

}
