import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, filter, map, mapTo} from "rxjs/operators";
import {serialize} from "../shared/serialize";
export enum RequestMethod {
  Get = 'GET',
  Head = 'HEAD',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Patch = 'PATCH'
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {

  }

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  headers2 = new HttpHeaders({
    'Accept': 'image/png',
    'Access-Control-Allow-Origin' : '*'
  });
  headers3 = new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin' : '*',
  });




  private request(path: string, body: any, method = RequestMethod.Post, customHeaders?: HttpHeaders): Observable<any> {
    const REQUEST = new HttpRequest(method, path, body, {
      headers: customHeaders || this.headers,
      withCredentials: true
    });

    return this.httpClient.request(REQUEST)
      .pipe(filter(response => response instanceof HttpResponse))
      .pipe(map((response: HttpResponse<any>) => response.body))
      .pipe(catchError(error => {
          throw error;
        }
      ));
  }
// FILE UPLOAD
  private request2(path: string, body: any, method = RequestMethod.Post, customHeaders?: HttpHeaders): Observable<any> {
    const REQUEST = new HttpRequest(method, path, body, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(REQUEST)
      .pipe(filter(response => response instanceof HttpResponse))
      .pipe(map((response: HttpResponse<any>) => response.body))
      .pipe(catchError(error => {
          throw error;
        }
      ));
  }

  get(path: string, args?: any): Observable<any> {
    const OPTIONS = {
      headers: this.headers,
      withCredentials: true
    };

    if(args) {
      OPTIONS['params'] = serialize(args);
    }

    return this.httpClient.get(path, OPTIONS)
      .pipe(catchError(error => {
          throw error;
        }
      ));
  }
  get2(path: string, args?: any): Observable<any> {
    const OPTIONS = {
      withCredentials: true
    };

    if(args) {
      OPTIONS['params'] = serialize(args);
    }

    return this.httpClient.get(path, OPTIONS)
      .pipe(catchError(error => {
          throw error;
        }
      ));
  }

  post(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
    return this.request(path, body, RequestMethod.Post, customHeaders);
  }
  post2(path: string, body: any, customHeaders?: HttpHeaders): Observable<any>{
    return this.request2(path, body, RequestMethod.Post, customHeaders);
  }

  put(path: string, body: any): Observable<any> {
    return this.request(path, body, RequestMethod.Put);
  }

  delete(path: string, body: any): Observable<any> {
    return this.request(path, body, RequestMethod.Delete);
  }

  // pagination student
  // getAll(params): Observable<any> {
  //   return this.httpClient.get(baseUrl, { params });
  // }
  getAll(path: string, args?: any): Observable<any> {
    const OPTIONS = {
      withCredentials: true
    };

    if(args) {
      OPTIONS['params'] = serialize(args);
    }

    return this.httpClient.get(path, OPTIONS)
      .pipe(catchError(error => {
          throw error;
        }
      ));
  }
}
