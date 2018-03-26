import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Match } from '../models/match';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';

@Injectable()
export class MatchService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  /** Get all matches, return a list of matches */
  getAllMatches(): Observable<Match[]> {


    return this.http.get(environment.reqUrl + "/api/matches/getall/")
      .map((res: any) => res);
  }
  /** GET all matches by Round Id, return a list of matches*/
  getAllMatchesByRound(roundId: string): Observable<Match[]> {

    const url = `${environment.reqUrl + "/api/matches/getAllByRound"}/${roundId}`;
    return this.http.get<Match[]>(url)
      .map((res: any) => res);
  }

  /** GET a match by id. Will 404 if id not found */
  getMatch(id: string): Observable<Match> {

    const url = `${environment.reqUrl + "/api/matches/getbyid"}/${id}`;
    return this.http.get<Match>(url)
      .map((res: any) => res);
  }

  /** POST: update the match on the server */
  updateMatch(match: Match): Observable<any> {
    return this.http.post<Match>(environment.reqUrl + "/api/matches/update/", match)
      .pipe(
        tap(_ => this.log(`updated match id=${match.Id}`)),
        catchError(this.handleError<any>('updateMatch'))
      );
  }

  /** POST: update the matches results on server**/
  proceedMatches(matches: Match[]) {
    const url = `${environment.reqUrl + "/api/matches/updateall"}`;
    return this.http.post(url, matches)
      .pipe(
        tap(_ => this.log(`updated all matches`)),
        catchError(this.handleError<any>('proceedMatches'))
      );
  }

  /** Log a MatchService message with the LogService */
  private log(message: string) {
    this.logService.add('MatchService: ' + message);
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
