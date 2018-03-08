import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Team } from '../team';
import { LogService } from './log.service';

@Injectable()
export class TeamService {
  reqUrl = 'http://localhost:55903';
  public obj: any = {};
  public httpOptions: any = {};
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  getAllTeams (): Observable<Team[]>{
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);

    return this.http.get<Team[]>(this.reqUrl + "/api/teams/getall/",this.httpOptions)
      .pipe(
        tap(tournments => this.log(`fetched teams`)),
        catchError(this.handleError('getAllTeams', []))
      );
  }
  /* GET all Tournament by League Id*/
  getAllTeamsByTour (TourId:string): Observable<Team[]>{
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);
    const url = `${this.reqUrl+ "/api/teams/getAllByTour"}/${TourId}`;
    return this.http.get<Team[]>(url,this.httpOptions)
      .pipe(
        tap(teams => this.log(`fetched teams`)),
        catchError(this.handleError('getAllTeamsByTour', []))
      );
  }

  /** GET a player by id. Will 404 if id not found */
  getTeam(id: string): Observable<Team> {
    this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);  this.obj=JSON.parse(localStorage.getItem('currentUser'));

    this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.obj['access_token'] })
    };
    this.log(this.obj['access_token']);
  const url = `${this.reqUrl+ "/api/teams/getbyid"}/${id}`;
  return this.http.get<Team>(url,this.httpOptions).pipe(
    tap(_ => this.log(`fetched team id=${id}`)),
    catchError(this.handleError<Team>(`getTeam id=${id}`))
    );
  }

  /** POST: update the hero on the server */
  updateTeam (team: Team): Observable<any> {
    return this.http.post<Team>(this.reqUrl + "/api/teams/update/", team, this.httpOptions).pipe(
      tap(_ => this.log(`updated team id=${team.Id}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }

  /** DELETE: remove a team from database **/
  deleteTeam (team: Team | number): Observable<Team> {
    const id = typeof team === 'number' ? team : team.Id;
    const url = `${this.reqUrl+ "/api/teams/delete"}/${id}`;

    return this.http.delete<Team>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted team id=${id}`)),
      catchError(this.handleError<Team>('deleteTeam'))
    );
  }
  /** Log a PlayerService message with the LogService */
  private log(message: string) {
    this.logService.add('TeamService: ' + message);
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
