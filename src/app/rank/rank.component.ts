import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RankService } from '../services/rank.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Rank } from '../models/rank';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  ranks: Rank[];
  tourId: any;
  constructor(
    private rankService: RankService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  // on init, get all ranks by tournament id
  ngOnInit() {
    this.tourId = this.route.snapshot.paramMap.get('Id');
    this.getAllRanksByTour(this.tourId);
  }

  // get all rank by tournament id
  getAllRanksByTour(id: string) {
    this.rankService.getAllRanksByTour(id).subscribe(ranks => this.ranks = ranks);

  }

  // go back to previous location
  goBack() {
    this.location.back();
  }

}
