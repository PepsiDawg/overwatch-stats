import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _loggedIn = false;

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
