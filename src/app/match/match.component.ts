import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { RoundService } from '../services/round.service';
import { Router } from '@angular/router'

import { Match } from '../match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matches: Match[];
  @Input() roundId: any;

  constructor() { }

  ngOnInit() {
  }

}
