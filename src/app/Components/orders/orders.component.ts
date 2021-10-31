import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  confirmStatus='no';
  quantity:any;
  shippingaddress:any;
  city:any;
  state:any;
  country:any;
  zip:any;
  phone:any;
  token=localStorage.getItem('token');
  productInfo:any;
  productId:any;

  id:String | undefined;
  result:any;
  orderForm!: FormGroup;



  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    //console.log(this.productId)
    this.productId = history.state.data;
    this.id = this.productId;
    // console.log(typeof(this.id));
    // console.log(typeof(this.productId));
    const headers = { 'Authorization': `Bearer ${this.token}`}
    this.http.get<any>(`http://localhost:3000/api/v1/products/${this.id}`, { headers }).subscribe(data => {
        // this.result = data.json;
        this.productInfo=data;

    })
    //console.log(typeof(this.result));

  }

  onConfirm(){
      const headers = { 'Authorization': `Bearer ${this.token}`};
    const body = { orderItems:[
      {
        quantity:this.quantity,
        product:this.id
      }
    ],
    shippingAddress:this.shippingaddress,
    city:this.city,
    zip:this.zip,
    state:this.state,
    country:this.country,
    phone:this.phone
   };
    this.http.post<any>('http://localhost:3000/api/v1/orders/add', body, { headers }).subscribe(data => {
        this.result = data;
    });
    console.log(this.result);

    if(this.result.totalPrice!==0){
      this.confirmStatus='yes';
    }
  }

}
