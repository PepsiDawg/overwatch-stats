import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-season-selector',
  templateUrl: './season-selector.component.html',
  styleUrls: ['./season-selector.component.css']
})
export class SeasonSelectorComponent implements OnInit {

  @Input() seasons = [];
  @Input() currentSeason = -1;

  @Output() update = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  seasonChanged(evt) {
    this.update.emit({
      value: evt.target.value
    });
  }
}
