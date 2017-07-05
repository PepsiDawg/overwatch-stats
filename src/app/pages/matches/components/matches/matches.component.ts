import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';
import { MatchDescriptorsComponent } from '../match-descriptors/match-descriptors.component';
import { MatchPlayersComponent } from '../match-players/match-players.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  _matches = [];
  _currentSeason;
  private _loading = true;
  private _matchesObs;

  constructor(private _firebase: FirebaseService, private _overwatchServices: OverwatchServices, private _router: Router) { }

  ngOnInit() {
    this._overwatchServices.getClienCurrentSeason()
      .subscribe(result => {
        if(result != -1) {
          this._currentSeason = result;
          if(this._matchesObs) { this._matchesObs.unsubscribe(); }
          this.getMatches();
        }
      });
  }

  getMatches() {
    this._matchesObs = this._firebase.getMatches(this._currentSeason)
      .subscribe(res => {
        console.log(res);
        this._matches = res;
      }, null, () => { this._loading = false; });
  }

  removeMatch(index) {
    let match = this._matches[index];
    this._firebase.removeMatch(match.$key, match.map, match.outcome, this._currentSeason);
  }

  edit(index) {
    this._router.navigate(['matches/edit/', this._matches[index].$key]);
  }
}
