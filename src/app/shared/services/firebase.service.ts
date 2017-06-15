import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';
import { OverwatchServices } from './overwatch.service';

@Injectable()
export class FirebaseService {
  private _matches: FirebaseListObservable<Match[]>;
  private _user;
  private _mapData: FirebaseListObservable<MapData[]>;
  private _temp_admin = ["pepsidawg00@gmail.com", "mysquishyturtle@gmail.com"];

  constructor(private _db: AngularFireDatabase, private _auth: AngularFireAuth, private _ow: OverwatchServices) { 
  }

  getMatches() {
    this._matches = this._db.list('/matches') as FirebaseListObservable<Match[]>;
    return this._matches;
  }

  getMatch(key) {
    return this._db.database.ref('/matches/' + key).once('value');
  }

  getUser(uid) {
      this._user = this._db.object('/users/' + uid) as FirebaseObjectObservable<User>;
      if(this._user) {
        return this._user;
      }
      return Observable.throw(new Error("No user found"));
  }

  getMapData() {
    this._mapData = this._db.list('/maps') as FirebaseListObservable<MapData[]>;
    return this._mapData;
  }

  addMatch(match) {
    this._db.database.ref('/matches/').push(match);
    this.updateMapOutcome(match.map, match.outcome, 1);
  }

  updateMatch(key, oldMatch, match) {
    this._db.database.ref('matches/' + key).update(match);
    if(oldMatch.outcome != match.outcome) {
      this.updateMultiOutcome(match.map, oldMatch.outcome, match.outcome);
    }
  }

  updateDatabase() {
    // this.updateLastGroup(["Kendrick", "Tim"]);
    // this.updatePlayedWith(["Kendrick", "Tim", "Lindle", "Robbie", "Strange", "Elly", "Dragon", "Ash"]);

    // let matches = this._db.database.ref('/matches').once("value");

    // matches.then(result => {
    //   let allMatches = result.val();

    //   for(let match in allMatches) {
    //     this._db.database.ref("/matches/")
    //     let temp_match = allMatches[match];
    //     temp_match["played_with"] = ["Kendrick", "Tim"];
    //     this._db.database.ref("/matches/" + match).update(temp_match);
    //     console.log(temp_match);
    //   }
    // });

  }

  updateLastGroup(group) {
    this._db.database.ref('last-group').set(group);
  }

  updatePlayedWith(players) {
    this._db.database.ref('played-with').set(players);
  }

  getAllPlayedWith() {
    return this._db.list("/played-with");
  }

  getLastGroup() {
    return this._db.list("/last-group");
  }

  removeMatch(key: string, map: string, outcome: string) {
    this._db.database.ref('/matches/' + key).remove();
    this.updateMapOutcome(map, outcome, -1);
  }

  updateMultiOutcome(map: string, oldOutcome: string, newOutcome: string) {
    this._db.database.ref('/maps/' + map).once('value').then(snapshot => {
        var record = snapshot.val();
        record[oldOutcome.toLowerCase()] += -1;
        record[newOutcome.toLowerCase()] += 1;
        this._db.database.ref('/maps/' + map).update(record);
    });
  }

  updateMapOutcome(map: string, outcome: string, value: number) {
    this._db.database.ref('/maps/' + map).once('value').then(snapshot => {
        var record = snapshot.val();
        record[outcome.toLowerCase()] += value;
        this._db.database.ref('/maps/' + map).update(record);
    });
  }

  login() {
    return this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
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
    return this._auth.auth.signOut();
  }
}

interface Map {
  won: number,
  draw: number,
  lost: number
}

interface MapData {
  $key: string;
  won: number;
  draw: number;
  lost: number;
}

interface User {
  timestamp: Date;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Match {
  $key?:string;
  timestamp: Date;
  map: string;
  outcome: string;
  kendrick_sr: number;
  tim_sr: number;
  group_size: number;
  leaver: boolean;
  snowflake: boolean;
  communication: boolean;
}