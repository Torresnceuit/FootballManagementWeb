import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Injectable()
export class UserService {
    reqUrl = 'http://localhost:55903';
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<User[]>(this.reqUrl + '/api/account/userinfo');
    }

    /*getById(id: number) {
        return this.http.get(this.reqUrl+'/api/account/' + id);
    }

    create(user: User) {
        return this.http.post(this.reqUrl+'/api/account', user);
    }

    update(user: User) {
        return this.http.put(this.reqUrl+'/api/account/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.reqUrl+'/api/account/' + id);
    }*/

}
