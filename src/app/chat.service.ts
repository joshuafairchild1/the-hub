import { Injectable } from '@angular/core';
import * as express from 'express';
import { Http } from '@angular/http';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

}
