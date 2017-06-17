import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  @Input() awards;

  constructor() { }

  ngOnInit() {
  }

}
