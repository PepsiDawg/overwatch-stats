import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  selector: 'app-sr-graph',
  templateUrl: './sr-graph.component.html',
  styleUrls: ['./sr-graph.component.css']
})
export class SrGraphComponent implements OnInit {
  loading = true;
  matches;

  kendrick_sr: number[] = [];
  tim_sr: number[] = [];

  datasets;
  labels: string[] = [];

  colors = [{
    backgroundColor: 'rgb(85, 129, 142)',
    borderColor: 'rgb(85, 129, 142)'
  },{
    backgroundColor: 'rgb(128, 85, 142)',
    borderColor: 'rgb(128, 85, 142)'
  }];
  
  type = "line"

  options = {
    tooltips: {
      mode: 'x',
      intersect: false,
      callbacks: {
        label: this.customTooltip
      }
    },
    scales: {
      xAxes: [{
        display: false
      }]
    }
  }

  constructor(private _firebase: FirebaseService) { 
  }

  customTooltip(tooltipItem, data) {
    var index = tooltipItem.index;
    var dataset = data.datasets[tooltipItem.datasetIndex];
    var name = dataset.label;
    var sr = tooltipItem.yLabel;
    var result = name + " " + sr

    if(index > 0) {
      var diff = sr - dataset.data[index - 1];
      var srGain = diff > 0 ? "+" + diff : diff;

      result += " (" + srGain + ")";
    }

    return result;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._firebase.getMatches()
        .subscribe(result => {
          this.matches = result;

          this.kendrick_sr = [];
          this.tim_sr = [];
          this.labels = [];

          for(let match of this.matches) {
            this.kendrick_sr.push(match.kendrick_sr);
            this.tim_sr.push(match.tim_sr);
            this.labels.push(match.map);
          }
          this.datasets = [
            {
              data: this.kendrick_sr, 
              label: "Kendrick", 
              fill: false,
              pointRadius: 3,
              pointHitRadius: 10
            },
            {
              data: this.tim_sr, 
              label: "Tim", 
              fill: false,
              pointRadius: 3,
              pointHitRadius: 10
            }
          ];
          console.log("test");
          this.loading = false;
        });
  }
}
