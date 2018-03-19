import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Team } from '../team';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TeamService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  /** Get all teams, return a list of teams */
  getAllTeams(): Observable<Team[]> {

    return this.http.get<Team[]>(environment.reqUrl + "/api/teams/getall/")
      .map((res: any) => res);
  }
  /** GET all team by Tournament Id*/
  getAllTeamsByTour(TourId: string): Observable<Team[]> {

    const url = `${environment.reqUrl + "/api/teams/getAllByTour"}/${TourId}`;
    return this.http.get<Team[]>(url)
      .map((res: any) => res);
  }

  /** GET a team by id. Will 404 if id not found */
  getTeam(id: string): Observable<Team> {

    const url = `${environment.reqUrl + "/api/teams/getbyid"}/${id}`;
    return this.http.get<Team>(url)
      .map((res: any) => res);
  }

  /** POST: update the team on the server */
  updateTeam(team: Team): Observable<any> {
    return this.http.post<Team>(environment.reqUrl + "/api/teams/update/", team).pipe(
      tap(_ => this.log(`updated team id=${team.Id}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }

  /** DELETE: remove a team from database **/
  deleteTeam(team: Team | number): Observable<Team> {
    const id = typeof team === 'number' ? team : team.Id;
    const url = `${environment.reqUrl + "/api/teams/delete"}/${id}`;

    return this.http.delete<Team>(url)
      .map((res: any) => res);
  }
  /** Log a Teamservice message with the LogService */
  private log(message: string) {
    this.logService.add('TeamService: ' + message);
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
