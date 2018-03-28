import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, RequestOptions, Headers, Response, } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TournamentService } from '../../services/tournament.service';
import { LogService } from '../../services/log.service';
import { Tournament } from '../../models/tournament';
import { environment } from '../../../environments/environment';
import { imgPathResponse } from '../add/add.component';
import { UploadManager } from '../../modules/upload-manager/uploadManager';


@Component({
  selector: 'app-addtournament',
  templateUrl: './addtournament.component.html',
  styleUrls: ['./addtournament.component.css']
})
export class AddtournamentComponent implements OnInit {

  // default image url to load
  url: any = environment.defaultImgUrl;

  // string variable to store guid
  imgPathRes: imgPathResponse;

  tour: any = {};
  @Input() leagueId: string;
  constructor(
    private element: ElementRef,
    private http: HttpClient,
    private tournamentService: TournamentService,
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

  //Update tournament to database
  save() {

    // assign logo url by reqUrl + guid 
    this.tour.Logo = environment.reqUrl + this.imgPathRes;
    this.leagueId = this.route.snapshot.paramMap.get('Id');
    this.tour.LeagueId = this.leagueId;
    console.log(this.tour.leagueId);
    console.log(this.tour.Logo);
    console.log(this.tour);
    this.tournamentService.updateTour(this.tour)
      .subscribe(() => this.goBack());
  }

  // readUrl and pass to the preview image
  readUrl(event: any) {
    this.upload(event);
    if (event.target.files && event.target.files[0]) {
      // upload files to database
      this.upload(event.target.files);
      var reader = new FileReader();
      // load url from selected file event
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      // read image data 
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  upload(fileList: FileList) {

    // upload files to server
    UploadManager.upload(this.http, fileList, this.imgPathRes);
  }
}
