import { Injectable } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Headers,
    Request
} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../environments/environment';


// Shows Progress bar and notifications
//import { NotifyService } from "./loader";

@Injectable()
export class HttpClientInterceptor extends Http {

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
    ) {
        super(backend, defaultOptions);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.get(this.getFullUrl(url), this.requestOptions(options));

    }



    // Implement POST, PUT, DELETE HERE
    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return super.post(this.getFullUrl(url), body, this.requestOptions(options));
    }

    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    delete(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return super.post(this.getFullUrl(url), body, this.requestOptions(options));
    }

    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers({
                'Authorization': `Bearer ${localStorage.getItem('currentUser')
                    ? JSON.parse(localStorage.getItem('currentUser'))['access_token'] : ""}`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        }
        return options;
    }

    /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    private getFullUrl(url: string): string {
        return environment.reqUrl + url;
    }



    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    /**
     * onSuccess
     * @param res
     */
    private onSuccess(res: Response): void {
        console.log(res);
    }



}