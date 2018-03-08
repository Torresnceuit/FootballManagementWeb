import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Team } from '../team';

import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from '../services/team.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  @Input() team: Team;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: PlayerService,
    private element: ElementRef,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam(): void {
  this.id = this.route.snapshot.paramMap.get('Id');
    this.teamService.getTeam(this.id)
    .subscribe(team => this.team = team);
    //this.teamService.getAllTeamsByTour(this.id).subscribe(teams => this.teams = teams);
  }

  goBack(): void {
    this.location.back();
  }

  logout(){
    
  }

  save(): void {

   this.teamService.updateTeam(this.team)
     .subscribe(() => this.goBack());
 }

}
