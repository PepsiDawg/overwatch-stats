import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from '../../services/firebase.service';
import { OverwatchServices } from '../../services/overwatch.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { SeasonSelectorComponent } from '../season-selector/season-selector.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  _loggedIn = false;
  _isAdmin = false;
  _currentSeason = -1;
  _seasons = [];

  constructor(
    private _firebaseService: FirebaseService, 
    private _owService: OverwatchServices,
    private _auth: AngularFireAuth,
    private _router: Router) { }

  ngOnInit() {
    this._auth.authState.subscribe(res => {
      this._loggedIn = (res != null);
      if(res != null) {
        this._firebaseService.getUser(res.uid)
          .then(result => {
            var user = result.val();
            this._isAdmin = user.isAdmin;
          });
      }
    });
    Observable.combineLatest(
      this._firebaseService.getCurrentSeason(),
      this._firebaseService.getTrackedSeasons()
    ).subscribe(result => {
      this._currentSeason = result[0].$value;
      this._owService.setClientCurrentSeason(this._currentSeason);
      this._seasons = result[1];
    });
  }

  login() {
    this._firebaseService.login();
  }

  logout() {
    this._firebaseService.logout();
    this._router.navigate([""]);
  }

  seasonUpdated(evt) {
    this._owService.setClientCurrentSeason(evt.value);
  }

}
