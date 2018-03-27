import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationService} from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from './services/register.service';
import { PlayerService } from './services/player.service';
import { LogService } from './services/log.service';
import { LogComponent } from './components/log/log.component';
import { AddComponent } from './components/add/add.component';
import { UploadComponent } from './components/upload/upload.component';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { TeamPlayersComponent } from './components/team-players/team-players.component';
import { LeagueService } from './services/league.service';
import { AddleagueComponent } from './components/addleague/addleague.component';
import { LeagueDetailComponent } from './components/league-detail/league-detail.component';
import { TournamentService } from './services/tournament.service';
import { AddtournamentComponent } from './components/addtournament/addtournament.component';
import { TournamentDetailComponent } from './components/tournament-detail/tournament-detail.component';
import { TeamService } from './services/team.service';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { AddteamComponent } from './components/addteam/addteam.component';
import { RoundDetailComponent } from './components/round-detail/round-detail.component';
import { RoundComponent } from './components/round/round.component';
import { RoundService } from './services/round.service';
import { MatchService } from './services/match.service';
import { MatchComponent } from './components/match/match.component';
import { RankComponent } from './components/rank/rank.component';
import { RankService } from './services/rank.service';
import { HttpClientInterceptor } from './interceptor/http-client-interceptor';
import { ConnectionBackend, XHRBackend, RequestOptions, Http, HttpModule} from '@angular/http';




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
    HttpModule

  ],
  providers: [AuthenticationService, AuthGuard,UserService, RegisterService, PlayerService, LogService, LeagueService,
  TournamentService,
  TeamService,
  RoundService,
  MatchService,
  RankService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpClientInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
