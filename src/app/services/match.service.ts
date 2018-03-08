import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Match } from '../match';
import { LogService } from './log.service';

@Injectable()
export class MatchService {
  reqUrl = 'http://localhost:55903';
  public obj: any = {};
  public httpOptions: any = {};
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  getAllMatches (): Observable<Match[]>{
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);

    return this.http.get<Match[]>(this.reqUrl + "/api/matches/getall/",this.httpOptions)
      .pipe<Match[]>(
        tap(matches => this.log(`fetched matches`)),
        catchError(this.handleError('getAllMatches', []))
      );
  }
  /* GET all Tournament by League Id*/
  getAllMatchesByRound (roundId:string): Observable<Match[]>{
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);
    const url = `${this.reqUrl+ "/api/matches/getAllByRound"}/${roundId}`;
    return this.http.get<Match[]>(url,this.httpOptions)
      .pipe<Match[]>(
        tap(matches => this.log(`fetched matches`)),
        catchError(this.handleError('getAllMatchesByRound', []))
      );
  }

  /** GET a player by id. Will 404 if id not found */
  getMatch(id: string): Observable<Match> {
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);
  const url = `${this.reqUrl+ "/api/matches/getbyid"}/${id}`;
  return this.http.get<Match>(url,this.httpOptions).pipe(
    tap(_ => this.log(`fetched match id=${id}`)),
    catchError(this.handleError<Match>(`getMatch id=${id}`))
    );
  }

  /** POST: update the tournamnet on the server */
  updateMatch (match: Match): Observable<any> {
    return this.http.post<Match>(this.reqUrl + "/api/matches/update/", match, this.httpOptions).pipe(
      tap(_ => this.log(`updated match id=${match.Id}`)),
      catchError(this.handleError<any>('updateMatch'))
    );
  }

  /** POST: update the match results **/
  proceedMatches(matches: Match[]){
    const url = `${this.reqUrl+ "/api/matches/updateall"}`;
    return this.http.post(url,matches, this.httpOptions).pipe(
      tap(_ => this.log(`updated all matches`)),
      catchError(this.handleError<any>('proceedMatches'))
    );
  }

  /** Log a PlayerService message with the LogService */
  private log(message: string) {
    this.logService.add('MatchService: ' + message);
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
