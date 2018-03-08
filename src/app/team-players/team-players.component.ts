import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router'

import { User } from '../user';
import { Player } from '../player';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {

  players: Player[];
  @Input() teamId: any;

  constructor(
    private authenticationService: AuthenticationService,
    private playerService: PlayerService,
    private router: Router,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit() {
    //this.authenticationService.checkCredential();
    this.getAllPlayersByTeam(this.teamId);



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

  getAllPlayers(){
    this.playerService.getAllPlayers().subscribe(players => this.players = players);

  }

  getAllPlayersByTeam(id:string){
    this.playerService.getAllPlayersByTeam(id).subscribe(players => this.players = players);

  }
  openAdd(){
    this.router.navigate(['./teamdetail/'+this.teamId+'/add']);
  }

  delete(player: Player){
    
  }

  logout(){
    this.authenticationService.logout();
  }

}
