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
import { Player } from '../models/player';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  // default image for player avatar
  url: any = "http://placehold.it/180";

  player: any = {};
  id: any;

  // Guid of image from server response
  imgPathRes: string;

  // array stores all positions
  positions = ['CF', 'RF', 'LF', 'CM', 'CAM', 'CDM', 'LM', 'RM', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'GK'];
  
  // map the position with checked box
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
    
    // renew the player position array
    this.positionsChecked = [];
    this.player.Positions = [];
    for (var x in this.positionsMap) {
      if (this.positionsMap[x]) {
        
        // push checked positions in an array
        this.positionsChecked.push(x);
        
        // push the checked position to player position array
        this.player.Positions.push(x);
      }

    }

  }

  // Update new player, get all attribute from html
  save(): void {

    // send avatar url to server: combination of reqUrl + Guid generated before
    this.player.Avatar = environment.reqUrl + this.imgPathRes;
   
    // get team Id from the route built
    this.id = this.route.snapshot.paramMap.get('Id');
    this.player.TeamId = this.id;
   
    // update all the positions selected
    this.updatePositions();

    console.log(this.player.Positions);
    console.log(this.player);
    
    // update player in database
    this.playerService.updatePlayer(this.player)
      .subscribe(() => this.goBack());
  }
  
  // readUrl and pass to the preview image
  readUrl(event: any) {
    
    // upload the image to database concurrently
    this.upload(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      // load url from target
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      
      // read image from url
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  upload(event) {
    
    // get file list
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file = fileList[0];
      
      // build body as form data
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      
      // url to send request
      let apiUrl1 = environment.reqUrl + "/api/players/Upload";


      if (formData) console.log(file);
      
      // post data to server
      this.http.post(apiUrl1, formData)
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            
            // get image Guid from response
            this.imgPathRes = data;
            console.log(this.imgPathRes);

          },
          error => console.log(error)
        )
    }

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
