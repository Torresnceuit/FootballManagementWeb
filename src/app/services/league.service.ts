import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { League } from '../models/league';
import { LogService } from './log.service';
import { environment } from '../../environments/environment'

@Injectable()
export class LeagueService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }


  /** GET: Return a list of leagues */
  getAllLeagues (): Observable<League[]>{
    return this.http.get<League[]>(environment.reqUrl + "/api/leagues/getall/")
      .map((res: any)=>res);
    
  }

  /** GET a league by id. Will 404 if id not found */
  getLeague(id: string): Observable<League> {
  const url = `${environment.reqUrl+ "/api/leagues/getbyid"}/${id}`;
  return this.http.get<League>(url)
    .map((res:any)=> res);
  
  }

  /** POST: update the league on the server */
  updateLeague (league: League): Observable<any> {
    return this.http.post<League>(environment.reqUrl + "/api/leagues/update/", league).pipe(
      tap(_ => this.log(`updated league id=${league.Id}`)),
      catchError(this.handleError<any>('updateLeague'))
    );
  }

  /** DELETE: delete the league from the server */
  deleteLeague (league: League | number): Observable<League> {
    const id = typeof league === 'number' ? league : league.Id;
    const url = `${environment.reqUrl+ "/api/leagues/delete"}/${id}`;

    return this.http.delete<League>(url)
      .map((res: any)=> res);
    
  }

  /** Log a LeagueService message with the LogService */
  private log(message: string) {
    this.logService.add('LeagueService: ' + message);
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
