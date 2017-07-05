import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { MatchFormPlayersComponent } from '../match-form-players/match-form-players.component';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit, OnDestroy {
  maps: string[];
  currentSeason = -1;
  title: string;
  players = ["Kendrick", "Tim"];
  playedWith = [];
  form : FormGroup;
  match;
  id;

  leaver = false;
  snowflake = false;
  communication = true;

  edit = false;
  subscription;

  loading = true;

  constructor(
    private _overwatchServices: OverwatchServices, 
    private _firebase: FirebaseService,
    private _router: Router,
    private _route: ActivatedRoute,
    fb: FormBuilder) {

      this.form = fb.group({
        map: ['', Validators.required],
        outcome: ['', Validators.required],
        kendrick_sr: ['', Validators.required],
        tim_sr: ['', Validators.required]
      });
   }

  ngOnInit() {
      this.subscription = Observable.combineLatest(
        this._overwatchServices.getMaps(),
        this._overwatchServices.getClienCurrentSeason(),
        this._firebase.getAllPlayedWith(),
        this._firebase.getLastGroup(),
        this._route.params
      ).map(result => {
        return new Object({
          maps: result[0],
          season: result[1],
          playedWith: result[2],
          lastGroup: result[3],
          params: result[4]
        });
      }).subscribe((result:any) => {
        this.id = result.params["id"];
        this.maps = result.maps;
        this.playedWith = this.fromFirebaseToArray(result.playedWith);
        this.players = this.fromFirebaseToArray(result.lastGroup);

        if(this.id && this.currentSeason != -1) {
          this._router.navigate(['matches']);
        } else {
          this.currentSeason = result.season;
        }

        if(this.id) {
          this.title = "Edit Match"
          this._firebase.getMatch(this.id, this.currentSeason)
              .then(match => {
                this.match = match.val();
                this.edit = true;

                this.form.setValue({
                  map: this.match.map,
                  outcome: this.match.outcome,
                  kendrick_sr: this.match.kendrick_sr,
                  tim_sr: this.match.tim_sr
                });
                this.snowflake = this.match.snowflake;
                this.leaver = this.match.leaver;
                this.communication = this.match.communication;
                this.players = this.match.played_with;
                this.loading = false;
              });
        } else {
          this.title = "Add a Match"
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveMap() {
    let result = this.form.value;
    console.log(this.snowflake, this.leaver);

    result["snowflake"] = this.snowflake;
    result["leaver"] = this.leaver;
    result["communication"] = this.communication;
    result["played_with"] = this.players;

    if(this.edit) {
      this._firebase.updateMatch(this.id, this.match, result, this.currentSeason);
      this._router.navigate(['matches']);
    } else {
      this._firebase.addMatch(result, this.currentSeason);
      this._firebase.updateLastGroup(this.players);
      this._router.navigate(['graphs']);
    }

    this._firebase.updatePlayedWith(this.playedWith);
  }

  updateValues(evt) {
    this.leaver = evt.leaver;
    this.snowflake = evt.snowflake;
    this.communication = evt.communication;
  }

  updatePlayedWith(evt) {
    this.playedWith = evt.played_with;
  }

  fromFirebaseToArray(dataIn) {
     let temp = [];

    for(let plyw in dataIn) {
      temp.push(dataIn[plyw].$value);
    }
    return temp;
  }
}
