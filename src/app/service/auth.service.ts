import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {UserService} from "./user.service";
import {HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private configService: ConfigService,
              private userService: UserService) {

  }

  login(user) {

    const LOGIN_HEADER = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const BODY = `username=${user.username}&password=${user.password}`;
    // return this.apiService.post(this.configService.getLoginUrl, BODY, LOGIN_HEADER)
    return this.apiService.post(this.configService.getLoginUrl, BODY, LOGIN_HEADER)
      .pipe(map(() => {
        console.log('Login success');
        // this.userService.getMyInfo().subscribe();
      }));
  }

  logout() {
    console.log('this.configService.getLogoutUrl '+this.configService.getLogoutUrl);
    return this.apiService.post(this.configService.getLogoutUrl, {})
      .pipe(map(() => {
        this.userService.currentUser = null;
      }));

  }
}
