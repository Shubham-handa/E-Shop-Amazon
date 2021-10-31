import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email=localStorage.getItem('email');
  name=localStorage.getItem('name');
  phone=localStorage.getItem('phone');

  constructor() { }

  ngOnInit(): void {
  }

}
