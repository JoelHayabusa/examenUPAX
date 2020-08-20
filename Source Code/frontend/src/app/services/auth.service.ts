import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:8443';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveData(res.dataUser);
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            console.log(res);
            this.saveData(res.dataUser);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveData(obj: any): void {
    localStorage.setItem("ACCESS_TOKEN", obj.accessToken);
    localStorage.setItem("EXPIRES_IN", obj.expiresIn);
    localStorage.setItem("FULL_NAME", obj.name+" "+obj.surname);
    localStorage.setItem("EMAIL", obj.email);
    this.token = obj.accessToken;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
