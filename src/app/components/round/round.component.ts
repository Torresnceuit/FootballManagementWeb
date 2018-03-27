import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RoundService } from '../../services/round.service';
import { Router } from '@angular/router'

import { Round } from '../../models/round';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  rounds: Round[];
  @Input() tourId: any;
  constructor(
    private authenticationService: AuthenticationService,
    private roundService: RoundService,
    private router: Router
  ) { }


  ngOnInit() {

    // get all round of tournament 
    this.getAllRoundsByTour(this.tourId);
  }

  // get all round by the tournament id
  getAllRoundsByTour(id: string) {
    this.roundService.getAllRoundsByTour(id).subscribe(rounds => this.rounds = rounds);

  }

  // get the round isdone information and return the background
  getBackgroundColor(IsDone: boolean) {
    if (IsDone) {

      // if round done
      return '#CFD8DC';
    }

  }


}
