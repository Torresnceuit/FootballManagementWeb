import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, RequestOptions, Headers, Response, } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamService } from '../../services/team.service';
import { LogService } from '../../services/log.service';
import { Team } from '../../models/team';
import { environment } from '../../../environments/environment';
import { UploadManager } from '../../modules/upload-manager/uploadManager';
import { imgPathResponse } from '../add/add.component';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {

  // default image url to load 
  url: any = environment.defaultImgUrl;

  // string variable to store guid
  imgPathRes: imgPathResponse;

  team: any = {};
  tourId: string;
  constructor(
    private element: ElementRef,
    private http: HttpClient,
    private teamService: TeamService,
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

  // Update tournament to database
  save() {

    this.team.Logo = environment.reqUrl + this.imgPathRes;
    this.tourId = this.route.snapshot.paramMap.get('Id');
    this.team.TourId = this.tourId;
    console.log(this.team.TourId);
    console.log(this.team.Logo);
    console.log(this.team);
    this.teamService.updateTeam(this.team)
      .subscribe(() => this.goBack());
  }

  // readUrl and pass to the preview image
  readUrl(event: any) {
    this.upload(event);
    if (event.target.files && event.target.files[0]) {
      this.upload(event.target.files);
      var reader = new FileReader();
      // load url from file selected event
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
