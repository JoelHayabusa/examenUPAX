import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';
import * as bcrypt from 'bcryptjs';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aux: string ='';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form): void {
    this.aux = '';
    this.aux = form.value.password
    let pass = Md5.hashStr(this.aux);
    form.value.password = pass;
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/userinfo');
    });
  }

}
