import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService} from "../service/token-storage.service";
import {NotificationService} from "../service/notification.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( private router: Router,private token: TokenStorageService,private notification :NotificationService) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler) {
    //   console.log("AuthInterceptor called");
    //     let authReq = req;
    //     const token = this.token.getToken();
    //     if (token != null) {
    //       console.log(token);
    //         authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    //     }
    //     console.log(authReq);
    //   next.handle(authReq);
    //     return next.handle(authReq);
    // }


  intercept(
    req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(evt => {
        if (evt instanceof HttpResponse) {
          if(evt.body && evt.body.success)
            // this.notification.showSuccess(evt.body.success.message, evt.body.success.title);
            this.notification.showSuccess("Loged In ", 'Success');
          // this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
        }
      }),
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          try {
            // this.router.navigate(['user-pages/login']);
            this.notification.showError(err, 'Error Occured');
          } catch(e) {
            this.router.navigate(['user-pages/login']);
            this.notification.showError('An Authenticatication error occurred', 'Error');
          }
          //log error
        }
        return of(err);
      }));

  }



}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
