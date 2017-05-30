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
import { OwIconComponent } from './shared/components/ow-icon/ow-icon.component';

//Services
import { OverwatchServices } from './shared/services/overwatch.service';
import { FirebaseService } from './shared/services/firebase.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { GraphsComponent } from './pages/graphs/components/graphs/graphs.component';
import { MatchesComponent } from './pages/matches/components/matches/matches.component';
import { MatchFormComponent } from './pages/matches/components/match-form/match-form.component';
import { HomeComponent } from './pages/home/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

import { AuthGuard } from './shared/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    OwIconComponent,
    NavbarComponent,
    GraphsComponent,
    MatchesComponent,
    MatchFormComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing
  ],
  providers: [
    OverwatchServices,
    FirebaseService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
