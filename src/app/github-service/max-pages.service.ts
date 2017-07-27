import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { oAuthToken } from './../api-keys';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MaxPagesService {

  constructor(
    private http: Http
  ) { }

  maxPages(url: string): Observable<any> {
    // const headers = new Headers();
    // headers.append(`Authorization`, `token ${oAuthToken}`);
    return this.http.get(`${url}?per_page=100`);
  }

}
