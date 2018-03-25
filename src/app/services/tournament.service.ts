import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { Tournament } from '../tournament';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';
@Injectable()
export class TournamentService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  /** Get all tournaments, return a list of tournaments */
  getAllTours(): Observable<Tournament[]> {

    return this.http.get<Tournament[]>(environment.reqUrl + "/api/tournaments/getall/")
      .map((res: any) => res);
  }
  /** GET all Tournaments by League Id, return a list of Tournaments*/
  getAllToursByLeague(leagueId: string): Observable<Tournament[]> {
    const url = `${environment.reqUrl + "/api/tournaments/getAllByLeague"}/${leagueId}`;
    return this.http.get<Tournament[]>(url)
      .map((res: any) => res);
  }

  /** GET a tournament by id. Will 404 if id not found */
  getTour(id: string): Observable<Tournament> {

    const url = `${environment.reqUrl + "/api/tournaments/getbyid"}/${id}`;
    return this.http.get<Tournament>(url)
      .map((res: any) => res);
  }

  /** POST: update the tournamnet on the server */
  updateTour(tour: Tournament): Observable<any> {
    return this.http.post<Tournament>(environment.reqUrl + "/api/tournaments/update/", tour).pipe(
      tap(_ => this.log(`updated tournament id=${tour.Id}`)),
      catchError(this.handleError<any>('updateTour'))
    );
  }

  /** DELETE: delete the tournament on server**/
  deleteTour(tour: Tournament | number): Observable<Tournament> {
    const id = typeof tour === 'number' ? tour : tour.Id;
    const url = `${environment.reqUrl + "/api/tournaments/delete"}/${id}`;

    return this.http.delete<Tournament>(url)
      .map((res: any) => res);
  }

  /** POST: Generate Round Robin Tournament*/
  generateFixture(id: string): any {

    const url = `${environment.reqUrl + "/api/generator/drawFixture"}/${id}`;
    return this.http.post(url, "").pipe(
      tap(_ => this.log(`generateFixture`)),
      catchError(this.handleError<any>('generateFixture'))
    );
  }

  /** DELETE: Delete all fixtures **/
  deleteFixture(id: string): any {
    const url = `${environment.reqUrl + "/api/generator/deleteFixture"}/${id}`;
    console.log(url);
    return this.http.delete(url).pipe(
      tap(_ => this.log(`deleteFixture`)),
      catchError(this.handleError<any>('deleteFixture'))
    );

  }

  /** POST: generate the rank on server*/
  generateRank(id: string): any {
    //this.deleteFixture(id);
    const url = `${environment.reqUrl + "/api/generator/generateRank"}/${id}`;
    return this.http.post(url, "").pipe(
      tap(_ => this.log(`generateRank`)),
      catchError(this.handleError<any>('generateRank'))
    );
  }

  /** Log a TournamentService message with the LogService */
  private log(message: string) {
    this.logService.add('TournamentService: ' + message);
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
