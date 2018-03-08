import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthenticationService} from'./authentication.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';
import { PlayerService } from './services/player.service';
import { LogService } from './services/log.service';
import { LogComponent } from './log/log.component';
import { AddComponent } from './add/add.component';
import { UploadComponent } from './upload/upload.component';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { LeagueService } from './services/league.service';
import { AddleagueComponent } from './addleague/addleague.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { TournamentService } from './services/tournament.service';
import { AddtournamentComponent } from './addtournament/addtournament.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TeamService } from './services/team.service';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { AddteamComponent } from './addteam/addteam.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { RoundComponent } from './round/round.component';
import { RoundService } from './services/round.service';
import { MatchService } from './services/match.service';
import { MatchComponent } from './match/match.component';
import { RankComponent } from './rank/rank.component';
import { RankService } from './services/rank.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LogComponent,
    AddComponent,
    UploadComponent,
    FileSelectDirective,
    PlayerDetailComponent,
    TeamPlayersComponent,
    AddleagueComponent,
    LeagueDetailComponent,
    AddtournamentComponent,
    TournamentDetailComponent,
    TeamDetailComponent,
    AddteamComponent,
    RoundDetailComponent,
    RoundComponent,
    MatchComponent,
    RankComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [AuthenticationService, AuthGuard,UserService, RegisterService, PlayerService, LogService, LeagueService,
  TournamentService,
  TeamService,
  RoundService,
  MatchService,
  RankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
