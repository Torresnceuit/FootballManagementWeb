import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, RequestOptions, Headers, Response, } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';

import { LeagueService } from '../../services/league.service';
import { LogService } from '../../services/log.service';
import { League } from '../../models/league';
import { environment } from '../../../environments/environment';
import { UploadManager } from '../../modules/upload-manager/uploadManager';
import { imgPathResponse } from '../add/add.component';

@Component({
  selector: 'app-addleague',
  templateUrl: './addleague.component.html',
  styleUrls: ['./addleague.component.css']
})
export class AddleagueComponent implements OnInit {
  // default url for player avatar
  url: any = environment.defaultImgUrl;
  // this variable is used to get image id from server
  imgPathRes: imgPathResponse = { value: "" };
  // variable to store league instance
  league: any = {};
  // constructor
  constructor(
    private element: ElementRef,
    private http: HttpClient,
    private leagueService: LeagueService,
    private logService: LogService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  // Go to the previous location
  goBack(): void {
    this.location.back();
  }

  // Update league to database
  save() {
    // build league logo url to store in database as string
    this.league.Logo = environment.reqUrl + this.imgPathRes;

    console.log(this.league.Logo)
    console.log(this.league);
    // update and return to the previous location
    this.leagueService.updateLeague(this.league)
      .subscribe(() => this.goBack());
  }

  // readUrl and pass to the preview image
  readUrl(event: any) {
    this.upload(event);

    if (event.target.files && event.target.files[0]) {
      // upload file to server
      this.upload(event.target.files);
      var reader = new FileReader();
      // load url from event
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      // read image from url
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  upload(fileList: FileList) {
    // upload files to server
    UploadManager.upload(this.http, fileList, this.imgPathRes);

  }

}
