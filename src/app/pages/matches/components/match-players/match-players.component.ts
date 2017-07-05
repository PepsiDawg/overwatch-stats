import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-players',
  templateUrl: './match-players.component.html',
  styleUrls: ['./match-players.component.css']
})
export class MatchPlayersComponent implements OnInit {
  @Input() players;
  showToolTip = false;

  constructor() { }

  ngOnInit() {
  }

}
