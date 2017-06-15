import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';

@Component({
  selector: 'app-map-graph',
  templateUrl: './map-graph.component.html',
  styleUrls: ['./map-graph.component.css']
})
export class MapGraphComponent implements OnInit {  
  datasets = [];
  data = [];
  colors = [];
  options = {};
  labels = [];
  type;

  show_all = true;
 
  maps = [];
  map_data = {};

  loading_data = true;
  loading_names = true;
  selected = "All";

  winPercentage = 0;

  constructor(private _firebase: FirebaseService, private _overwatch: OverwatchServices) { }

  ngOnInit() {
    this._firebase.getMapData()
        .subscribe(result => {
          for(let map of result) {
            this.map_data[map.$key] = {}
            this.map_data[map.$key]["won"] = map.won;
            this.map_data[map.$key]["draw"] = map.draw;
            this.map_data[map.$key]["lost"] = map.lost;
          }
          this.changeGraph();
        });
    this._overwatch.getMaps()
        .subscribe(result => {
          this.maps = result;
        }, null, () => { this.loading_names = false; });
  }

  mapSelected(evt) {
    this.selected = evt.target.value;
    this.changeGraph();
  }

  changeGraph() {
    this.loading_data = true;

    this.data = [];
    this.datasets = [];
    this.options = {};
    this.labels = [];

    if(this.selected == "All") {
      this.show_all = true;
      this.type = "horizontalBar"
      let won = [];
      let draw = [];
      let lost = [];

      for(var name in this.map_data) {
        let map = this.map_data[name];
        this.labels.push(name);
        won.push(map.won);
        draw.push(map.draw);
        lost.push(map.lost);
      }

      this.datasets = [
        { data: won, label: "Won" },
        { data: draw, label: "Draw" },
        { data: lost, label: "Lost" }
      ];

      this.colors = [
        { backgroundColor: 'rgb(91, 163, 75)' },
        { backgroundColor: 'rgb(252, 239, 58)' },
        { backgroundColor: 'rgb(219, 54, 54)' }
      ];

      this.options = {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
      this.winPercentage = this.calcAllWin();
    } else {
      this.show_all = false;
      let map = this.map_data[this.selected];
      this.type = "doughnut";
      this.labels = ["Won", "Draw", "Lost"];
      this.data = [map.won, map.draw, map.lost];
      this.colors = [{backgroundColor: ["rgb(91, 163, 75)", "rgb(252, 239, 58)", "rgb(219, 54, 54)"]}];
      this.winPercentage = this.calcWin(map);
    }

    this.loading_data = false;
  }

  calcWin(map) {
    return Math.floor((map.won / (map.won + map.draw + map.lost)) * 100);
  }

  calcAllWin() {
    let win = 0;
    let total = 0;
    for(let mapName in this.map_data) {
      let map = this.map_data[mapName];
      total += map.won + map.draw + map.lost;
      win += map.won;
    }

    return Math.floor((win / total) * 100);
  }
}
