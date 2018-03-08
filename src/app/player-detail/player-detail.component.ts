import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Player } from '../player';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @Input() player: Player;
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private element: ElementRef,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPlayer();
  }

  getPlayer(): void {
  const id = this.route.snapshot.paramMap.get('Id');
    this.playerService.getPlayer(id)
    .subscribe(player => this.player = player);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

   this.player.Positions = (this.element.nativeElement.querySelector('#_playerPos').value).split(",");
   console.log(this.player.Positions);
   this.playerService.updatePlayer(this.player)
     .subscribe(() => this.goBack());
 }

}
