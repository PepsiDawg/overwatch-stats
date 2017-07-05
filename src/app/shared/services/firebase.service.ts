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

  getMatches(season) {
    this._matches = this._db.list('/seasons/season_' + season + "/matches") as FirebaseListObservable<Match[]>;
    return this._matches;
  }

  getMatch(key, season) {
    return this._db.database.ref('/seasons/season_' + season + "/matches/" + key).once('value');
  }

  getUser(uid) {
      this._user = this._db.database.ref('/users/' + uid).once("value");
      if(this._user) {
        return this._user;
      }
      return Observable.throw(new Error("No user found"));
  }

  getMapData(season) {
    let path = "seasons/season_" + season + "/maps/"
    console.log(path);
    this._mapData = this._db.list(path) as FirebaseListObservable<MapData[]>;
    return this._mapData;
  }

  addMatch(match, season) {
    let path = 'seasons/season_' + season + "/matches/";
    this._db.database.ref(path).push(match);
    this.updateMapOutcome(match.map, match.outcome, 1, season);
  }

  updateMatch(key, oldMatch, match, season) {
    let path = 'seasons/season_' + season + "/matches/" + key
    console.log(path, key)
    this._db.database.ref(path).update(match);
    if(oldMatch.outcome != match.outcome) {
      this.updateMultiOutcome(match.map, oldMatch.outcome, match.outcome, season);
    }
  }

  updateDatabase() {

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

  removeMatch(key: string, map: string, outcome: string, season) {
    let path = "seasons/season_" + season + "/matches/" + key;
    this._db.database.ref(path).remove();
    this.updateMapOutcome(map, outcome, -1, season);
  }

  updateMultiOutcome(map: string, oldOutcome: string, newOutcome: string, season) {
    let path = 'seasons/season_' + season + '/maps/' + map;
    this._db.database.ref(path).once('value').then(snapshot => {
        var record = snapshot.val();
        record[oldOutcome.toLowerCase()] += -1;
        record[newOutcome.toLowerCase()] += 1;
        this._db.database.ref(path).update(record);
    });
  }

  updateMapOutcome(map: string, outcome: string, value: number, season) {
    let path = 'seasons/season_' + season + '/maps/' + map;
    this._db.database.ref(path).once('value').then(snapshot => {
        var record = snapshot.val();
        record[outcome.toLowerCase()] += value;
        this._db.database.ref(path).update(record);
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

  setupSeason(season) {
    let basePath = "seasons/season_" + season;
    let db_season = {};
    let temp_maps = { won: 0, draw: 0, lost: 0 };
    this._ow.getMaps().subscribe(result => {
      db_season["maps"] = {};
      for(let map of result) {
        db_season["maps"][map] = temp_maps;
      }
      db_season["matches"] = {};
      this._db.database.ref(basePath).set(db_season);
    });
    let seasons = this._db.database.ref("seasons/tracked").once("value");

    seasons.then(result => {
      let seasonArr = result.val();
      seasonArr.push(season);
      seasonArr.sort();
      this._db.database.ref("seasons/tracked").set(seasonArr);
    });
  }

  setCurrentSeason(season) {
    this._db.database.ref("current_season").set(season);
  }

  getCurrentSeason() {
    return this._db.object('current_season');
  }

  getTrackedSeasons() {
    return this._db.object("seasons/tracked");
  }

  getSeason(season) {
    return this._db.database.ref("seasons/season_" + season).once("value");
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