import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  fullname: string = localStorage.getItem("FULL_NAME");
  email: string = localStorage.getItem("EMAIL");
  constructor() { }

  ngOnInit(): void {
  }

}
