import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-match-form-players',
  templateUrl: './match-form-players.component.html',
  styleUrls: ['./match-form-players.component.css']
})
export class MatchFormPlayersComponent implements OnInit {

  @Input() players = [];
  @Input() playedWith = [];

  @Output() update = new EventEmitter<any>();

  form: FormGroup;

  constructor(fb: FormBuilder) { 
    this.form = fb.group({
      name: ['']
    });
  }

  ngOnInit() {
  }

  addName() {
    let name = this.form.value.name;
    if(this.validateName(name)) {
      this.players.push(name);
      this.form.reset();
    }
  }

  addPlayer(evt) {
    let name = evt.target.value;
    if(this.validateName(name)) {
      this.players.push(name);
      if(!this.playedWith.includes(name)) {
        this.playedWith.push(name);
        this.sendUpdate();
      }
    }
  }

  validateName(name) {
    return name != ""              &&
           name != null            &&
           this.players.length < 6 &&
           !this.players.includes(name);
  }

  removePlayer(index) {
    this.players.splice(index, 1);
  }

  sendUpdate() {
    this.update.emit({
      played_with: this.playedWith
    });
  }
}
