import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, RequestOptions, Headers, Response, } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayerService } from '../services/player.service';
import { LogService } from '../services/log.service';
import { Player } from '../player';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  url: any = "http://placehold.it/180";
  player: any = {};
  id: any;
  imgPathRes: string;
  positions = ['CF', 'RF', 'LF', 'CM', 'CAM', 'CDM', 'LM', 'RM', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'GK'];
  positionsMap = {
    'CF': false,
    'RF': false,
    'LF': false,
    'CM': false,
    'CAM': false,
    'CDM': false,
    'LM': false,
    'RM': false,
    'CB': false,
    'LB': false,
    'RB': false,
    'LWB': false,
    'RWB': false,
    'GK': false

  };
  positionsChecked = [];

  constructor(
    private element: ElementRef,
    private http: HttpClient,
    private playerService: PlayerService,
    private logService: LogService,
    private route: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit() {
  }
  // Go to the previous location
  goBack(): void {
    this.location.back();
  }

  // Update the checked value from the option
  updateCheckedPositions(position, event: any) {
    this.positionsMap[position] = event.target.checked;

  }

  updatePositions() {
    this.positionsChecked = [];
    this.player.Positions = [];
    for (var x in this.positionsMap) {
      if (this.positionsMap[x]) {
        this.positionsChecked.push(x);
        this.player.Positions.push(x);
      }

    }

  }

  // Update new player, get all attribute from html
  save(): void {

    this.player.Avatar = environment.reqUrl + this.imgPathRes;
    this.id = this.route.snapshot.paramMap.get('Id');
    this.player.TeamId = this.id;
    this.updatePositions();

    console.log(this.player.Positions);
    console.log(this.player);
    this.playerService.updatePlayer(this.player)
      .subscribe(() => this.goBack());
  }
  // readUrl and pass to the preview image*/
  readUrl(event: any) {
    this.upload(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }

  upload(event) {
    let fileList: FileList = event.target.files;
    //let fileList = this.element.nativeElement.querySelector('#uploadFile').files;

    if (fileList.length > 0) {
      let file = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      //this.player.Avatar = this.reqUrl+'/Content/Upload/'+file.name;
      let apiUrl1 = environment.reqUrl + "/api/players/Upload";


      if (formData) console.log(file);
      this.http.post(apiUrl1, formData)
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            this.imgPathRes = data;
            console.log(this.imgPathRes);

          },
          error => console.log(error)
        )
    }

    //window.location.reload();

  }

  /* Log a PlayerService message with the LogService */
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
