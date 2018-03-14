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

  leagues: League[]; // retrieve league instances 
  constructor(
    private authenticationService: AuthenticationService,
    private leagueService: LeagueService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // get all leagues when open page
    this.getAllLeagues();



  }

  // Get background color for position badge
  getBackground(position){
    
    var lastChar = position.substr(position.length-1);
    
    // Back position => green
    if(lastChar=="B"){
      return "green";
    }
    // Forward position => red
    if(lastChar=="F"){
      return "red";
    }
    // Midlefield => blue
    if(lastChar=="M"){
      return "blue";
    }
    // Others => yellow
    return "yellow";

  }

  getAllLeagues(){
    // use leagueservice to get all leagues
    this.leagueService.getAllLeagues().subscribe(leagues => this.leagues = leagues); // subscribe to store leagues

  }
  openAdd(){
    this.router.navigate(['./addleague']); // open add league page
  }

  logout(){
    this.authenticationService.logout();
  }

  delete(league: League){
    this.leagues = this.leagues.filter(h => h !== league); // remove the deleted league from leagues
      this.leagueService.deleteLeague(league).subscribe(); // delete league in database
  }

}
