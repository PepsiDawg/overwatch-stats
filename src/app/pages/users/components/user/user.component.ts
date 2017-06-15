import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _firebase: FirebaseService) { }

  ngOnInit() {
    this._firebase.updateDatabase();
  }
}
