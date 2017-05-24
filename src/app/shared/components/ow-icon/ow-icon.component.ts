import { Component, OnInit, Input } from '@angular/core';
import { OverwatchServices } from '../../services/overwatch.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ow-icon',
  templateUrl: './ow-icon.component.html',
  styleUrls: ['./ow-icon.component.css']
})
export class OwIconComponent implements OnInit {

  @Input() playerId: string;
  loading = true;

  username: string;
  level: number;
  rankURL: string;
  frameURL: string;
  starURL: string;
  heroURL: string;

  constructor(private _overwatchServices: OverwatchServices) { }

  ngOnInit() {
        Observable.forkJoin(
          this._overwatchServices.getUserProfile(this.playerId),
          this._overwatchServices.getUserStats(this.playerId)
        ).map(joined => {
          return new Object({
            profile: joined[0],
            stats: joined[1]
          });
        }).subscribe((res: any) => {
          this.username = res.profile.username;
          this.level = res.profile.level;
          this.starURL = res.profile.star;
          this.frameURL = res.profile.levelFrame;
          this.rankURL = res.profile.competitive.rank_img;
          this.heroURL = res.stats.stats.top_heroes.competitive[0].img;
        }, 
        null,
        () => { this.loading = false; });
  }

}
