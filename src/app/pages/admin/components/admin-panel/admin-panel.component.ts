import { Component, OnInit } from '@angular/core';
import { AddSeasonComponent } from '../add-season/add-season.component';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private _firebase: FirebaseService) { }

  ngOnInit() {
  }

  updateDB() {
    this._firebase.updateDatabase();
  }
}
