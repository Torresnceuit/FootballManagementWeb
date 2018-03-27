import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { League } from '../../models/league';
import { Tournament } from '../../models/tournament';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LeagueService } from '../../services/league.service';
import { TournamentService } from '../../services/tournament.service';



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

    // Get league detail information
    this.getLeague(); 

  }

  getLeague(): void {

    // get league Id from route
    this.id = this.route.snapshot.paramMap.get('Id'); 
    this.leagueService.getLeague(this.id)
      .subscribe(league => this.league = league);

    //get all tournaments
    this.tournamentService.getAllToursByLeague(this.id).subscribe(tours => this.tours = tours);
  }




  openAdd() {
    this.router.navigate(['./leaguedetail', this.id, 'addtournament']); // open page to add new tournament
  }

  // go to previous page
  goBack(): void {
    this.location.back();
  }

  save(): void {

    this.leagueService.updateLeague(this.league)

    // after saving done, go back to last page
      .subscribe(() => this.goBack()); 
  }

  delete(tour: Tournament) {

    // remove tournament from list
    this.tours = this.tours.filter(h => h !== tour); 

    // delete tournament in database
    this.tournamentService.deleteTour(tour).subscribe(); 
  }



}
