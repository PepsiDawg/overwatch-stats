import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit, OnDestroy {
  maps: string[];
  title: string;
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
        this._firebase.getMatch(this.id)
            .then(res => {
              this.match = res.val();

              this.form.setValue({
                map: this.match.map,
                outcome: this.match.outcome,
                kendrick_sr: this.match.kendrick_sr,
                tim_sr: this.match.tim_sr
              });
              this.snowflake = this.match.snowflake;
              this.leaver = this.match.leaver;
              this.communication = this.match.communication;

              this.edit = true;
            });
      } else {
        this.title = "Add a Match"
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

    if(this.edit) {
      this._firebase.updateMatch(this.id, this.match, result);
      this._router.navigate(['matches']);
    } else {
      this._firebase.addMatch(result);
      this._router.navigate(['graphs']);
    }
  }

  updateValues(evt) {
    this.leaver = evt.leaver;
    this.snowflake = evt.snowflake;
    this.communication = evt.communication;
  }
}
