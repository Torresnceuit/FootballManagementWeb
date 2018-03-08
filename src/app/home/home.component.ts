import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { LeagueService } from '../services/league.service';
import { Router } from '@angular/router'

import { User } from '../user';
import { League } from '../league';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  leagues: League[];
  constructor(
    private authenticationService: AuthenticationService,
    private leagueService: LeagueService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    //this.authenticationService.checkCredential();
    this.getAllLeagues();



  }
  getBackground(position){
    //console.log("log"+ image);
    var lastChar = position.substr(position.length-1);
    //this.sanitizer.bypassSecurityTrustStyle(`url(${position})`);
    if(lastChar=="B"){
      return "green";
    }
    if(lastChar=="F"){
      return "red";
    }
    if(lastChar=="M"){
      return "blue";
    }
    return "yellow";

  }

  getAllLeagues(){
    this.leagueService.getAllLeagues().subscribe(leagues => this.leagues = leagues);

  }
  openAdd(){
    this.router.navigate(['./addleague']);
  }

  logout(){
    this.authenticationService.logout();
  }

  delete(league: League){
    this.leagues = this.leagues.filter(h => h !== league);
      this.leagueService.deleteLeague(league).subscribe();
  }

}
