import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService} from "../service/token-storage.service";
import {NotificationService} from "../service/notification.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";


const TOKEN_HEADER_KEY = 'Authorization';
const EXPIRED_MESSAGE = 'Full authentication is required to access this resource';

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
          if (evt.body.type == 'application/json') {
          }
          if(evt.body && evt.body.success)
            // this.notification.showSuccess(evt.body.success.message, evt.body.success.title);
            this.notification.showSuccess("Loged In ", 'Success');
          // this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
        }
      }),
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          try {
            if(err != null && err.status===403){
              this.router.navigate(['error-pages/403']);
            }
            if(err != null && err.status===500){
              this.router.navigate(['error-pages/500']);
            }
            // IF SESSION EXPIRED REDIRECT TO LOGIN
            if(err != null && err.error != null && err.error.message != null ){
                    if(EXPIRED_MESSAGE === err.error.message){
                      this.router.navigate(['user-pages/login']);
                    }
            }
            if (err instanceof HttpErrorResponse && err.status===200) {// blob type  (image )
              // console.log(JSON.stringify(err,null,4));
              const newRequest = req.clone();
              return next.handle(newRequest);
            }
            // this.router.navigate(['user-pages/login']);
            // console.log(JSON.stringify(err,null,4));
           if (err.error ==null) { // REDIRECT TO SENDER
              const newRequest = req.clone();
              return next.handle(newRequest);
            }else{
             console.log(JSON.stringify(err,null,4));
             this.notification.showError(err, 'Error Occured');
             // this.router.navigate(['user-pages/login']);
           }

            // this.notification.showError(err, 'Error Occured');

          } catch(e) {
            // console.log(JSON.stringify(err,null,4));
            // this.router.navigate(['user-pages/login']);
            this.notification.showError('An Authentication error occurred', 'Error');
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
