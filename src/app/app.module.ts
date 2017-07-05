import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { routing } from './app.routing';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { OwIconComponent } from './pages/users/components/ow-icon/ow-icon.component';
import { GraphsComponent } from './pages/graphs/components/graphs/graphs.component';
import { MatchesComponent } from './pages/matches/components/matches/matches.component';
import { MatchFormComponent } from './pages/matches/components/match-form/match-form.component';
import { HomeComponent } from './pages/home/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ChartsModule } from '../ng2-charts/ng2-charts';

//Services
import { OverwatchServices } from './shared/services/overwatch.service';
import { FirebaseService } from './shared/services/firebase.service';


import { AuthGuard } from './shared/services/auth-guard.service';
import { SrGraphComponent } from './pages/graphs/components/sr-graph/sr-graph.component';
import { UserComponent } from './pages/users/components/user/user.component';
import { MapGraphComponent } from './pages/graphs/components/map-graph/map-graph.component';
import { MatchFormTogglesComponent } from './pages/matches/components/match-form-toggles/match-form-toggles.component';
import { MatchFormPlayersComponent } from './pages/matches/components/match-form-players/match-form-players.component';
import { MatchDescriptorsComponent } from './pages/matches/components/match-descriptors/match-descriptors.component';
import { PlayerStatsComponent } from './pages/users/components/player-stats/player-stats.component';
import { MatchPlayersComponent } from './pages/matches/components/match-players/match-players.component';
import { AdminPanelComponent } from './pages/admin/components/admin-panel/admin-panel.component';
import { AddSeasonComponent } from './pages/admin/components/add-season/add-season.component';
import { SeasonSelectorComponent } from './shared/components/season-selector/season-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    OwIconComponent,
    NavbarComponent,
    GraphsComponent,
    MatchesComponent,
    MatchFormComponent,
    HomeComponent,
    NotFoundComponent,
    SrGraphComponent,
    UserComponent,
    MapGraphComponent,
    MatchFormTogglesComponent,
    MatchFormPlayersComponent,
    MatchDescriptorsComponent,
    PlayerStatsComponent,
    MatchPlayersComponent,
    AdminPanelComponent,
    AddSeasonComponent,
    SeasonSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing,
    ChartsModule
  ],
  providers: [
    OverwatchServices,
    FirebaseService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
