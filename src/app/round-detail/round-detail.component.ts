import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatchService } from '../services/match.service';
import { RoundService } from '../services/round.service';
import { RankService } from '../services/rank.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Match } from '../match';
import { Round } from '../round';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent implements OnInit {
  matches: Match[];
  round: Round = new Round();
  Id: any;
  isValid = true;
  constructor(
    private matchService: MatchService,
    private roundService: RoundService,
    private rankService: RankService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get('Id'); // get round Id from route
    this.getRound(this.Id);
    this.getAllMatchesByRound(this.Id); // get all matches of round with Id

    this.isValid = false


  }

  ngAfterViewInit() {

  }

  //Get round detail
  getRound(id: string) {
    this.roundService.getRound(id)
      .subscribe(round => {
        this.round = round; // assign round
        // If round is done, deactive proceed button
        this.isValid = !this.round.IsDone;
      });

  }

  getAllMatches() {
    this.matchService.getAllMatches()
      .subscribe(matches => this.matches = matches); // assign matches from response to list of matches

  }

  //Get all the matches of round by roundId
  getAllMatchesByRound(id: string) {
    this.matchService.getAllMatchesByRound(id)
      .subscribe(matches => this.matches = matches);

  }

  //Simulate the matches with random results
  proceed() {
    for(var match of this.matches) {
      var maxNumHome = this.getRandom(0, 10);
      var maxNumAway = this.getRandom(0, 5);
      if (match.HomeId != null && match.AwayId != null) {
        match.HomeScore = this.getRandom(0, maxNumHome);
        match.AwayScore = this.getRandom(0, maxNumAway);
        match.IsDone = true;
      }

    }
    // inform round is done
    this.round.IsDone = true;


    this.roundService.updateRound(this.round).subscribe();
    this.matchService.proceedMatches(this.matches).subscribe(Ok => {
      this.isValid = false
      console.log('Proceed done!')
    });

  }

  goBack(): void {
    this.location.back();
  }

  /* Get the rank table of tournament */
  openRank() {

  }

  /* Get random result from 0 to 5*/
  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
