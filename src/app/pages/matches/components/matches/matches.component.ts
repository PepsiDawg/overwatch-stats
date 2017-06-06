import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  _matches = [];
  private _loading = true;

  constructor(private _firebase: FirebaseService, private _router: Router) { }

  ngOnInit() {
    this._firebase.getMatches()
        .subscribe(res => {
          this._matches = res;
        }, null, () => { this._loading = false; });
  }

  removeMatch(index) {
    let match = this._matches[index];
    this._firebase.removeMatch(match.$key, match.map, match.outcome);
  }

  edit(index) {
    this._router.navigate(['matches/edit/', this._matches[index].$key]);
  }
}
