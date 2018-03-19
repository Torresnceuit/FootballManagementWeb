import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, RequestOptions, Headers, Response, } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamService } from '../services/team.service';
import { LogService } from '../services/log.service';
import { Team } from '../team';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {
  url: any = "http://placehold.it/180";
  imgPathRes: string;
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

  // Go to the previous location*/
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
      let apiUrl1 = environment.reqUrl + "/api/Upload/Image";

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

}
