import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FirebaseService {
  private _matches: FirebaseListObservable<Match[]>;
  private _user;
  private _temp_admin = ["pepsidawg00@gmail.com"];

  constructor(private _db: AngularFireDatabase, private _auth: AngularFireAuth) { 

  }

  getMatches() {
    this._matches = this._db.list('/matches') as FirebaseListObservable<Match[]>;
    return this._matches;
  }

  getCurrentUser() {
    this._user = this._db.object('/users/' + this._auth.auth.currentUser.uid) as FirebaseObjectObservable<User>;
    return this._user;
  }

  addMatch(map: string, outcome: string, kendrick_sr: number, tim_sr: number) {
    let match = {
      map: map,
      outcome: outcome,
      kendrick_sr: kendrick_sr,
      tim_sr: tim_sr
    }
    this._db.database.ref('/matches/').push(match);
  }

  login() {
    this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          let user = {
            timestamp: new Date(),
            name: res.user.displayName,
            email: res.user.email,
            isAdmin: this._temp_admin.includes(res.user.email)
          }

          this.addUser(res.user.uid, user);
      });
  }

  addUser(id: string, user: User) {
    this._db.database.ref('users/' + id).update(user);
  }

  logout() {
    this._auth.auth.signOut();
  }
}

interface User {
  timestamp: Date;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Match {
  $key?:string;
  map: string;
  outcome: string;
  kendrick_sr: number;
  tim_sr: number;
}