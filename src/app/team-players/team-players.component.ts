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
  ) { }

  ngOnInit() {

    // get all players of team
    this.getAllPlayersByTeam(this.teamId);



  }

  // get postion and return background
  getBackground(position) {

    // get the last char of position
    var lastChar = position.substr(position.length - 1);

    // if last char is B => Defender, green
    if (lastChar == "B") {
      return "green";
    }

    // if last char is F => Forward, red
    if (lastChar == "F") {
      return "red";
    }

    // if last char is M => Midlefielder, blue
    if (lastChar == "M") {
      return "blue";
    }

    // others, yellow
    return "yellow";

  }

  // get all players of team
  getAllPlayersByTeam(id: string) {
    this.playerService.getAllPlayersByTeam(id).subscribe(players => this.players = players);

  }

  // add player
  openAdd() {
    this.router.navigate(['./teamdetail/' + this.teamId + '/add']);
  }

  // delete player
  delete(player: Player) {

    this.playerService.deletePlayer(player).subscribe(Ok => {

      // remove player after response
      this.players = this.players.filter(h => h !== player);
    });
  }

  // log out
  logout() {
    this.authenticationService.logout();
  }

}
