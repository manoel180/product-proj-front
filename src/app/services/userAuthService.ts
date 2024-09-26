import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { SessionService } from "./sessionService.service";
import { IUserAuthService } from "./IUserAuthService";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigAPI } from "./config";
import { Router } from "@angular/router";
import { Token } from "../core/model/token";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements IUserAuthService {

  key = '##MS1XRUtjDf';

  constructor(private sessionService: SessionService, private http: HttpClient,
    private router: Router
  ) {

  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getToken(): string {
    return this.decrypt(this.sessionService.getItem("currentUser"));
  }

  login(_login: string, _password: string): Observable<any>{

    let body = new URLSearchParams();
    body.set('username', _login);
    body.set('password', _password);

    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

   return this.http.post<Token>(ConfigAPI.LOGIN, body.toString(), options)
   .pipe(
    tap((result) => {
      this.sessionService.setItem("currentUser", this.encrypt(result.access_token));
      this.router.navigateByUrl('/home');
   }));



  }


  logout() {
    this.sessionService.removeItem("currentUser");
  }
}
