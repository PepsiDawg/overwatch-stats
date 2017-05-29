import { Router, RouterModule } from '@angular/router';

import { GraphsComponent } from './pages/graphs/components/graphs/graphs.component';
import { MatchesComponent } from './pages/matches/components/matches/matches.component';
import { MatchFormComponent } from './pages/matches/components/match-form/match-form.component';
import { HomeComponent } from './pages/home/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routing = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'matches/new', component: MatchFormComponent },
    { path: 'matches/edit:id', component: MatchFormComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: '**', component: NotFoundComponent }
])