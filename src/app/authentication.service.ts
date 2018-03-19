import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientInterceptor } from './http-interceptor'
import { environment } from '../environments/environment';



@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  login(username: string, password: string) {

    let body: HttpParams = new HttpParams();
    body = body.append('grant_type', 'password');
    body = body.append('username', username);
    body = body.append('password', password);
    return this.http.post(environment.reqUrl + '/token', body)

      .map(user => {
        // login successful if there's a token in the response
        if (user && user['access_token']) {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }



}
