import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Rank } from '../rank';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RankService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  /** Get all ranks, return a list of ranks */
  getAllRanks(): Observable<Rank[]> {

    return this.http.get<Rank[]>(environment.reqUrl + "/api/ranks/getall/")
      .map((res: any) => res);
  }

  /** GET all rank by Tournament Id, return a list of ranks*/
  getAllRanksByTour(tourId: string): Observable<Rank[]> {

    const url = `${environment.reqUrl + "/api/ranks/getAllByTour"}/${tourId}`;
    return this.http.get<Rank[]>(url)
      .map((res: any) => res);
  }

  /** GET a rank by id. Will 404 if id not found */
  getRank(id: string): Observable<Rank> {

    const url = `${environment.reqUrl + "/api/ranks/getbyid"}/${id}`;
    return this.http.get<Rank>(url)
      .map((res: any) => res);
  }

  /** POST: update the rank on the server */
  updateRank(rank: Rank): Observable<any> {
    return this.http.post<Rank>(environment.reqUrl + "/api/ranks/update/", rank)
      .pipe(
        tap(_ => this.log(`updated rank id=${rank.Id}`)),
        catchError(this.handleError<any>('updateRank'))
      );
  }

  /** POST: generate the rank on server*/
  generateRank(id: string): Observable<any> {
    //this.deleteFixture(id);
    const url = `${environment.reqUrl + "/api/generator/generateRank"}/${id}`;
    return this.http.post(url, "")
      .pipe(
        tap(_ => this.log(`generateRank`)),
        catchError(this.handleError<any>('generateRank'))
      );
  }

  /** Log a RankService message with the LogService */
  private log(message: string) {
    this.logService.add('RankService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
