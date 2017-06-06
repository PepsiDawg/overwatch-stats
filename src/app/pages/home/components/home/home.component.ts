import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _loggedIn = false;

  constructor(
    private _firebaseService: FirebaseService, 
    private _auth: AngularFireAuth,
    private _router: Router) { }

  ngOnInit() {
    this._auth.authState.subscribe(res => {
      this._loggedIn = (res != null);
    });
  }

  login() {
    this._firebaseService.login();
  }

  logout() {
    this._firebaseService.logout();
    this._router.navigate([""]);
  }

}
