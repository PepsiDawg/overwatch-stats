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
    this._overwatchServices.getMaps()
        .subscribe(res => {
          this.maps = res;
        });
    this.subscription = this._route.params.subscribe(params => {
      this.id = params["id"];
      if(this.id) {
        this.title = "Edit Match";
        Observable.combineLatest(
          this._firebase.getMatch(this.id),
          this._firebase.getAllPlayedWith(),
          this._firebase.getLastGroup()
        ).subscribe(result => {
          let temp_match = result[0].val();

          this.playedWith = this.fromFirebaseToArray(result[1]);
          this.players = this.fromFirebaseToArray(result[2]);

          this.match = temp_match;

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
          this.edit = true;
        });
      } else {
        this.title = "Add a Match"
        Observable.combineLatest(
          this._firebase.getAllPlayedWith(),
          this._firebase.getLastGroup()
        ).subscribe(result => {
          this.playedWith = this.fromFirebaseToArray(result[0]);
          this.players = this.fromFirebaseToArray(result[1]);
        });
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
      this._firebase.updateMatch(this.id, this.match, result);
      this._router.navigate(['matches']);
    } else {
      this._firebase.addMatch(result);
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
