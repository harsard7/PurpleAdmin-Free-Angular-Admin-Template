import {MessageService} from "../service/message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
// import {Observable} from "rxjs/Observable";
// import {of} from "rxjs/observable/of";
// import {Superdto} from "./super-d-t-o";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export class AbstractService<T> {

  get _http(): HttpClient {
    return this.http;
  }

  getRestApiUrl(): string {
    throw new Error('You have to implement the method getRestApiUrl!');
  }

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  // getAll(): Observable<T[]> {
  //   this.log('Service: fetched');
  //   return this._http.get<T[]>(this.getRestApiUrl());
  // }
  //
  // getById(id: number): Observable<T> {
  //   this.log(`Service: fetched item from ${this.getRestApiUrl()} with id=${id}`);
  //   const url = `${this.getRestApiUrl()}/${id}`;
  //   return this._http.get<T>(url)
  // }
  //
  // addOrUpdate(item: T): Observable<T> {
  //   return this._http.post<T>(this.getRestApiUrl(), item, httpOptions).pipe(
  //     tap(_ => this.log(`added item with id=${item.id}`)),
  //     catchError(this.handleError<any>('addOrUpdate'))
  //   );
  // }
  //
  // delete(item: T): Observable<T> {
  //   const id = typeof item === 'number' ? item : item.id;
  //   const url = `${this.getRestApiUrl()}/${id}`;
  //   console.log(url);
  //   return this._http.delete<T>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted id=${id}`)),
  //     catchError(this.handleError<any>('delete'))
  //   );
  // }
  //
  // private log(message: string) {
  //   console.log(message);
  //   // this.messageService.add('Service: ' + message);
  // }
  //
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
