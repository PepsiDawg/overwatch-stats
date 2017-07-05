import { Component, OnInit } from '@angular/core';
import { SrGraphComponent } from '../sr-graph/sr-graph.component';
import { MapGraphComponent } from '../map-graph/map-graph.component';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  private _currentSeason = -1;
  private _loading = true;

  constructor(private _overwatchServices: OverwatchServices) { }

  ngOnInit() {
    this._overwatchServices.getClienCurrentSeason()
        .subscribe(result => {
          if(result != -1) {
            this._currentSeason = result;
            this._loading = false;
          }
        });
  }

}
