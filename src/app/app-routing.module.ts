import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AddComponent } from './components/add/add.component';
import { UploadComponent } from './components/upload/upload.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { AddleagueComponent } from './components/addleague/addleague.component';
import { LeagueDetailComponent } from './components/league-detail/league-detail.component';
import { AddtournamentComponent } from './components/addtournament/addtournament.component';
import { TournamentDetailComponent } from './components/tournament-detail/tournament-detail.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { AddteamComponent } from './components/addteam/addteam.component';
import { RoundDetailComponent } from './components/round-detail/round-detail.component';
import { RankComponent } from './components/rank/rank.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'teamdetail/:Id/add', component: AddComponent, canActivate : [AuthGuard]},
  { path: 'addleague', component: AddleagueComponent, canActivate : [AuthGuard]},
  { path: 'upload', component: UploadComponent, canActivate : [AuthGuard]},
  { path: 'leaguedetail/:Id/addtournament', component: AddtournamentComponent, canActivate : [AuthGuard]},
  { path: 'tourdetail/:Id/addteam', component: AddteamComponent, canActivate : [AuthGuard]},
  { path: 'tourdetail/:Id/rank', component: RankComponent, canActivate : [AuthGuard]},
  { path: 'upload', component: UploadComponent, canActivate : [AuthGuard]},
  { path: '', component: HomeComponent , canActivate : [AuthGuard]},
  { path: 'detail/:Id', component: PlayerDetailComponent , canActivate : [AuthGuard]},
  { path: 'leaguedetail/:Id', component: LeagueDetailComponent , canActivate : [AuthGuard]},
  { path: 'tourdetail/:Id', component: TournamentDetailComponent , canActivate : [AuthGuard]},
  { path: 'teamdetail/:Id', component: TeamDetailComponent , canActivate : [AuthGuard]},
  { path: 'rounddetail/:Id', component: RoundDetailComponent , canActivate : [AuthGuard]},
  { path: '**', redirectTo: '' }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]


})
export class AppRoutingModule { }
