import { Component, OnInit, Input, Output, EventEmitter
 } from '@angular/core';

@Component({
  selector: 'app-match-form-toggles',
  templateUrl: './match-form-toggles.component.html',
  styleUrls: ['./match-form-toggles.component.css']
})
export class MatchFormTogglesComponent implements OnInit {
  @Input() leaver: boolean;
  @Input() snowflake: boolean;
  @Input() communication: boolean;

  @Output() update = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  sendUpdate() {
    this.update.emit({
      leaver: this.leaver,
      snowflake: this.snowflake,
      communication: this.communication
    });
  }

}
