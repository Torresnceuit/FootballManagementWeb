import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';

@Injectable()
export class PlayerService {
  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  /** Get all players, return a list of players */
  getAllPlayers(): Observable<Player[]> {

    return this.http.get<Player[]>(environment.reqUrl + "/api/players/getall/")
      .map((res: any) => res);
  }

  /** GET all Players by Team Id, return a list of Players*/
  getAllPlayersByTeam(TeamId: string): Observable<Player[]> {

    const url = `${environment.reqUrl + "/api/players/getAllByTeam"}/${TeamId}`;
    return this.http.get<Player[]>(url)
      .map((res: any) => res);
  }

  /** GET a player by id. Will 404 if id not found */
  getPlayer(id: string): Observable<Player> {

    const url = `${environment.reqUrl + "/api/players/getbyid"}/${id}`;
    return this.http.get<Player>(url)
      .map((res: any) => res);
  }
  /** POST: update the player on the server */
  updatePlayer(player: Player): Observable<any> {
    return this.http.post<Player>(environment.reqUrl + "/api/players/update/", player).pipe(
      tap(_ => this.log(`updated player id=${player.Id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  /** DELETE: delete the player from the server */
  deletePlayer (player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.Id;
    const url = `${environment.reqUrl+ "/api/players/delete"}/${id}`;

    return this.http.delete<Player>(url)
      .map((res: any)=> res);
    
  }

  /** Log a PlayerService message with the LogService */
  private log(message: string) {
    this.logService.add('PlayerService: ' + message);
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
