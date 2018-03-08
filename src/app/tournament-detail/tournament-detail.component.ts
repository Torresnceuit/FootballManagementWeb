import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Team } from '../team';
import { Tournament } from '../tournament';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from '../services/team.service';
import { TournamentService } from '../services/tournament.service';
const BYE:number = -1;

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
    this.getTour();
  }

  getTour(): void {
  this.id = this.route.snapshot.paramMap.get('Id');
    this.tournamentService.getTour(this.id)
    .subscribe(tour => this.tour = tour);
    this.teamService.getAllTeamsByTour(this.id).subscribe(teams => this.teams = teams);
  }


  openAdd(){
    this.router.navigate(['./tourdetail',this.id,'addteam']);
  }

  goBack(): void {
    this.location.back();
  }
  /* Save tournament*/
  save(): void {

   this.tournamentService.updateTour(this.tour)
     .subscribe(() => this.goBack());
   }
   /** Delete a team **/
   delete(team:Team){
     this.teams = this.teams.filter(h => h !== team);
       this.teamService.deleteTeam(team).subscribe();
   }

   /*Generate the fixture for whole season*/
   generateFixture(){
     this.tournamentService.generateFixture(this.id)
     .subscribe((ok)=> window.location.reload());

   }

   /*Show the table of tournament*/
   openRank(){
     this.tournamentService.generateRank(this.id).subscribe(Ok=> this.router.navigate(['./tourdetail',this.id,'rank']));

   }



}