import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/registerModel';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  register(model: RegisterModel) {

    let body: HttpParams = new HttpParams();
    // define body request
    body = body.append('Username', model.Username);
    body = body.append('Email', model.Email);
    body = body.append('Password', model.Password);
    body = body.append('ConfirmPassword', model.ConfirmPassword);
    
    // send request to server
    return this.http.post<any>(environment.reqUrl + '/api/account/register', body);

  }

}
