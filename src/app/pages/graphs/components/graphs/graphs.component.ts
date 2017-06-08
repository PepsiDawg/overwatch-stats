import { Component, OnInit } from '@angular/core';
import { SrGraphComponent } from '../sr-graph/sr-graph.component';
import { MapGraphComponent } from '../map-graph/map-graph.component';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
