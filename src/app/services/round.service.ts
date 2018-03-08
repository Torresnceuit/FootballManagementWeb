import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Round } from '../round';
import { LogService } from './log.service';

@Injectable()
export class RoundService {
  reqUrl = 'http://localhost:55903';
  public obj: any = {};
  public httpOptions: any = {};
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  getAllRounds (): Observable<Round[]>{
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);

    return this.http.get<Round[]>(this.reqUrl + "/api/rounds/getall/",this.httpOptions)
      .pipe<Round[]>(
        tap(rounds => this.log(`fetched rounds`)),
        catchError(this.handleError('getAllRounds', []))
      );
  }
  /* GET all Tournament by League Id*/
  getAllRoundsByTour (tourId:string): Observable<Round[]>{
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);
    const url = `${this.reqUrl+ "/api/rounds/getAllByTour"}/${tourId}`;
    return this.http.get<Round[]>(url,this.httpOptions)
      .pipe<Round[]>(
        tap(rounds => this.log(`fetched rounds`)),
        catchError(this.handleError('getAllRoundsByTour', []))
      );
  }

  /** GET a player by id. Will 404 if id not found */
  getRound(id: string): Observable<Round> {
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);
  const url = `${this.reqUrl+ "/api/rounds/getbyid"}/${id}`;
  return this.http.get<Round>(url,this.httpOptions).pipe(
    tap(_ => this.log(`fetched round id=${id}`)),
    catchError(this.handleError<Round>(`getRound id=${id}`))
    );
  }

  /** POST: update the tournamnet on the server */
  updateRound (round: Round): Observable<any> {
    return this.http.post<Round>(this.reqUrl + "/api/rounds/update/", round, this.httpOptions).pipe(
      tap(_ => this.log(`updated round id=${round.Id}`)),
      catchError(this.handleError<any>('updateRound'))
    );
  }

  /** Log a PlayerService message with the LogService */
  private log(message: string) {
    this.logService.add('RoundService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
