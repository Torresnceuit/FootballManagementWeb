import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { RankService } from '../services/rank.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Rank } from '../rank';

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




  ngOnInit(){
    this.tourId = this.route.snapshot.paramMap.get('Id');
    this.getAllRanksByTour(this.tourId);
  }

  getAllRanks(){
    this.rankService.getAllRanks().subscribe(ranks => this.ranks = ranks);

  }

  getAllRanksByTour(id:string){
    this.rankService.getAllRanksByTour(id).subscribe(ranks => this.ranks = ranks);

  }

  goBack(){
    this.location.back();
  }

}
