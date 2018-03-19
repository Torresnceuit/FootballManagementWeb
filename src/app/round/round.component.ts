import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { RoundService } from '../services/round.service';
import { Router } from '@angular/router'

import { Round } from '../round';

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

    this.getAllRoundsByTour(this.tourId);
  }

  getAllRounds() {
    this.roundService.getAllRounds().subscribe(rounds => this.rounds = rounds);

  }

  getAllRoundsByTour(id: string) {
    this.roundService.getAllRoundsByTour(id).subscribe(rounds => this.rounds = rounds);

  }

  getBackgroundColor(IsDone: boolean) {
    if (IsDone) {
      return '#CFD8DC';
    }

  }


}
