import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Team } from '../team';
import { Tournament } from '../tournament';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from '../services/team.service';
import { TournamentService } from '../services/tournament.service';
const BYE: number = -1;

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  @Input() tour: Tournament;
  teams: Team[];
  id: any;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private tournamentService: TournamentService,
    private element: ElementRef,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {

    // get tour on create
    this.getTour();
  }

  getTour(): void {

    // get tournament Id from route
    this.id = this.route.snapshot.paramMap.get('Id');
    this.tournamentService.getTour(this.id)

      // subscribe to the response
      .subscribe(tour => this.tour = tour);

    // get all teams of tournament
    this.teamService.getAllTeamsByTour(this.id).subscribe(teams => this.teams = teams);
  }



  openAdd() {

    // navigate to add team page
    this.router.navigate(['./tourdetail', this.id, 'addteam']);
  }

  goBack(): void {

    // return to last location
    this.location.back();
  }

  //Save tournament
  save(): void {

    this.tournamentService.updateTour(this.tour)

      // return to last location
      .subscribe(() => this.goBack());
  }

  //Delete a team
  delete(team: Team) {

    this.teamService.deleteTeam(team).subscribe(Ok => {

      // remove team after response
      this.teams = this.teams.filter(h => h !== team);
    });
  }

  //Generate the fixture for whole season
  generateFixture() {
    this.tournamentService.generateFixture(this.id)
      .subscribe((ok) => window.location.reload());

  }

  //Generate rank and show table
  openRank() {
    this.tournamentService.generateRank(this.id)
      .subscribe(Ok => this.router

        // open rank page
        .navigate(['./tourdetail', this.id, 'rank']));

  }



}
