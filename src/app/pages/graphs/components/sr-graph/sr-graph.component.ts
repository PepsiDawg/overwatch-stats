import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';

@Component({
  selector: 'app-sr-graph',
  templateUrl: './sr-graph.component.html',
  styleUrls: ['./sr-graph.component.css']
})
export class SrGraphComponent implements OnInit {
  loading = true;
  matches;
  season;

  drag = false;
  showSize = 50;
  upperbounds = 0;
  lowerbounds = 0;
  currentX = 0;

  kendrick_sr: number[] = [];
  tim_sr: number[] = [];

  datasets;
  labels: string[] = [];
  allLabels: string[] = [];

  colors = [{
    backgroundColor: 'rgb(85, 129, 142)',
    borderColor: 'rgb(85, 129, 142)'
  },{
    backgroundColor: 'rgb(128, 85, 142)',
    borderColor: 'rgb(128, 85, 142)'
  }];
  
  type = "line"

  options = {
    animation: false,
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

  constructor(private _firebase: FirebaseService, private _overwatchServices: OverwatchServices) { 
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
    this._overwatchServices.getClienCurrentSeason()
    .subscribe(result =>{
      this.season = result;
      this._firebase.getMatches(this.season)
        .subscribe(result => {
          this.matches = result;

          this.calcBounds();

          this.kendrick_sr = [];
          this.tim_sr = [];
          this.labels = [];
          this.allLabels = [];
          let index = 1;

          for(let match of this.matches) {
            this.kendrick_sr.push(match.kendrick_sr);
            this.tim_sr.push(match.tim_sr);
            this.allLabels.push(match.map + " (" + index + ")");
            index++;
          }

          this.fitData();

          this.loading = false;
          
        });
    })
  }

  mouseDown(evt) {
    this.drag = true;
    this.currentX = evt.layerX;
  }

  mouseUp(evt) {
    this.drag = false;
  }

  mouseLeave(evt) {
    this.drag = false;
  }

  mouseMove(evt) {
    if(this.drag) {
      let x = evt.layerX;
      let width = evt.target.width;
      let diff = x - this.currentX;
      let tickSize = (width / this.matches.length) / 2;
      let step = Math.abs(diff) > tickSize;
      let scalor = diff < 0 ? 1 : -1;

      if(step) {
        this.changeBounds(scalor);
        this.currentX = x;
        this.fitData();
      }
    }
  }

  wheelEvent(evt) {
    let pos = evt.layerX - evt.target.offsetLeft - 38;
    pos = pos < 0 ? 0 : pos;
    let canvasSize = evt.target.width - 38;
    let percent = pos / canvasSize
    let matchNum = this.lowerbounds + Math.ceil(this.showSize * percent);
    let dir = evt.deltaY;

    if(dir <= 0) {
      this.showSize = this.showSize - 1 <= 0 ? 1 : this.showSize - 1;
    } else {
      this.showSize = this.showSize + 1 >= this.matches.length ? this.matches.length : this.showSize + 1;
    }

    this.calcBounds();
    this.fitData();
    return false;
  }

  calcBounds() {
    this.upperbounds = this.matches.length;
    this.lowerbounds = this.upperbounds - this.showSize;
  }

  changeBounds(scalor) {
    let size = this.matches.length;
    let lowerAllow = (this.lowerbounds + scalor >= 0) && 
                     (this.lowerbounds + scalor <= (size - this.showSize));
    let upperAllow = (this.upperbounds + scalor >= this.showSize) &&
                     (this.upperbounds + scalor <= size);
    if(lowerAllow && upperAllow) {
      this.lowerbounds += scalor;
      this.upperbounds += scalor;
    }
  }

  fitData() {
    this.labels = [];
    this.labels = this.allLabels.slice(this.lowerbounds, this.upperbounds);
    let temp_kendrick = this.kendrick_sr.slice(this.lowerbounds, this.upperbounds);
    let temp_tim = this.tim_sr.slice(this.lowerbounds, this.upperbounds);

    this.datasets = [
      {
        data: temp_kendrick, 
        label: "Kendrick", 
        fill: false,
        pointRadius: 3
      },
      {
        data: temp_tim, 
        label: "Tim", 
        fill: false,
        pointRadius: 3
      }
    ];
  }
}
