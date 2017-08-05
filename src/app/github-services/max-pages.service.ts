import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MaxPagesService {

  constructor(
    private http: Http
  ) { }

  maxPages(url: string): Observable<any> {
    return this.http.get(`${url}?per_page=100`);
  }

}
