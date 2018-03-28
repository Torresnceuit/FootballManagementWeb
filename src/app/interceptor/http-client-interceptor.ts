import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let contentType = false;
        let headers = request.headers;
        if (!request.url.includes(environment.reqUrl + "/api/Upload/Image", 0)) {
            contentType = true;
        }

        if(contentType){
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${localStorage.getItem('currentUser')
                        ? JSON.parse(localStorage.getItem('currentUser'))['access_token'] : ""}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }else{
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${localStorage.getItem('currentUser')
                        ? JSON.parse(localStorage.getItem('currentUser'))['access_token'] : ""}`,
                }
            });
        }
        
        return next.handle(request);
    }

}