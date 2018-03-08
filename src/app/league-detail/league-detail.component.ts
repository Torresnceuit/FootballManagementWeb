import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { League } from '../league';
import { Tournament } from '../tournament';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { LeagueService } from '../services/league.service';
import { TournamentService } from '../services/tournament.service';



@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit {
  @Input() league: League;
  tours: Tournament[];
  id: any;
  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private tournamentService: TournamentService,
    private element: ElementRef,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLeague();

  }

  getLeague(): void {
  this.id = this.route.snapshot.paramMap.get('Id');
    this.leagueService.getLeague(this.id)
    .subscribe(league => this.league = league);
    this.tournamentService.getAllToursByLeague(this.id).subscribe(tours => this.tours = tours);
  }


  /*getAllToursByLeague(){
      this.tournmentService.getAllToursByLeague(this.id).subscribe(tours => this.tours = tours);
  }*/

  openAdd(){
    this.router.navigate(['./leaguedetail',this.id,'addtournament']);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

   this.leagueService.updateLeague(this.league)
     .subscribe(() => this.goBack());
  }

  delete(tour:Tournament){
    this.tours = this.tours.filter(h => h !== tour);
      this.tournamentService.deleteTour(tour).subscribe();
  }



}
