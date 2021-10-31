import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  statusSignup = false;
  name:any;
  phone:any;
  email:any;
  password:any;
  token:any;
  result:any;



  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  onCheck(value:any){
    if(value.length>0){
      this.router.navigateByUrl('/home');
    }
  }

  onLogin(){
    const body = { email:this.email, password:this.password };
    this.http.post<any>('http://localhost:3000/api/v1/users/login', body).subscribe(data => {
        this.token =  data.token;
        this.phone =  data.phone;
        this.email =  data.user;
        this.name =  data.name
        localStorage.setItem('email',this.email);
        localStorage.setItem('name',this.name);
        localStorage.setItem('phone',this.phone);

    });
    //console.log(this.token);
    // if(this.token.length!==0){
    //   this.router.navigateByUrl('/home');
    // }
    localStorage.setItem('token',this.token);
    this.onCheck(this.token);

  }

  onSignup(value:any){
    console.log(value);
    this.statusSignup=value;
  }


  onRegister(){
    const body = { email:this.email, password:this.password, name:this.name, phone:this.phone };
    this.http.post<any>('http://localhost:3000/api/v1/users/addUser', body).subscribe(data => {
        this.result=data;
    });
    if(this.result.id!==null){
      this.statusSignup=false;
    }
  }

}
