import { Component, OnInit} from '@angular/core';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.css']
})
export class AddSeasonComponent implements OnInit {
  season = 1;
  season_error = false;

  constructor(private _firebase: FirebaseService) { }

  ngOnInit() {
  }

  valueChanged(evt) {
    let val = evt.target.value;

    if(val != "" && val > 0) {
      this.season = val;
      this.season_error = false;
    } else {
      this.season = 1;
      this.season_error = true;
    }
  }

  addSeason() {
    this._firebase.getSeason(this.season)
      .then(result => {
        if(result.val() == null) {
          this._firebase.setupSeason(this.season);
        } else {
          alert("'season_" + this.season + "' is already in the database!");
        }
      });
  }

  makeCurrent() {
    this._firebase.getSeason(this.season)
      .then(result => {
        if(result.val() != null) {
          this._firebase.setCurrentSeason(this.season);
        } else {
          alert("Can't find 'season_" + this.season + "' in the database!");
        }
      });
  }
}
