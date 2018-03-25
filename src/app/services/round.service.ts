import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Round } from '../round';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RoundService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  /** Get all rounds, return a list of rounds */
  getAllRounds(): Observable<Round[]> {


    return this.http.get<Round[]>(environment.reqUrl + "/api/rounds/getall/")
      .map((res: any) => res);
  }
  
  /** GET all rounds by Tournament Id, return a list of rounds*/
  getAllRoundsByTour(tourId: string): Observable<Round[]> {

    const url = `${environment.reqUrl + "/api/rounds/getAllByTour"}/${tourId}`;
    return this.http.get<Round[]>(url)
      .map((res: any) => res);
  }

  /** GET a round by id. Will 404 if id not found */
  getRound(id: string): Observable<Round> {

    const url = `${environment.reqUrl + "/api/rounds/getbyid"}/${id}`;
    return this.http.get<Round>(url)
      .map((res: any) => res);
  }

  /** POST: update the round on the server */
  updateRound(round: Round): Observable<any> {
    return this.http.post<Round>(environment.reqUrl + "/api/rounds/update/", round).pipe(
      tap(_ => this.log(`updated round id=${round.Id}`)),
      catchError(this.handleError<any>('updateRound'))
    );
  }

  /** Log a RoundService message with the LogService */
  private log(message: string) {
    this.logService.add('RoundService: ' + message);
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
