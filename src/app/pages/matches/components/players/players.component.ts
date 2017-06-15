import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Input() players;

  constructor() { }

  ngOnInit() {
  }
}
