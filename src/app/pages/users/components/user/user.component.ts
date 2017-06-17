import { Component, OnInit } from '@angular/core';
import { OverwatchServices } from '../../../../shared/services/overwatch.service';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { OwIconComponent } from '../ow-icon/ow-icon.component';
import { PlayerStatsComponent } from '../player-stats/player-stats.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loading = true;
  ids = ["Squishy-12869", "PepsiDog-1793"];
  data:any = [{}, {}];
  selected = 0;
  categories = [];

  constructor(private _firebase: FirebaseService, private _overwatch: OverwatchServices) { }

  ngOnInit() {
    Observable.forkJoin(
      this.getUserData(this.ids[0]),
      this.getUserData(this.ids[1])
    ).subscribe(result => {
      this.data[0] = result[0];
      this.data[1] = result[1];

      for(let cat in this.data[0].stats) {
        this.categories.push(cat);
      }
      this.loading = false;
    });
  }

  capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  private getUserData(id) {
    return Observable.forkJoin(
      this._overwatch.getUserProfile(id),
      this._overwatch.getUserStats(id)
    ).map(joined => {
      return new Object({
        profile: joined[0],
        stats: joined[1]
      });
    }).map((user: any) => {
      let data:any = {}
      //Get Information for icon component
      data.icon = {};
      data.icon.username = user.profile.username;
      data.icon.level = user.profile.level;
      data.icon.sr = user.profile.competitive.rank;
      data.icon.starURL = user.profile.star;
      data.icon.frameURL = user.profile.levelFrame;
      data.icon.rankURL = user.profile.competitive.rank_img;
      data.icon.heroURL = user.stats.stats.top_heroes.competitive[0].img;

      //Stats
      data.username = user.profile.username;
      data.games = user.profile.games.competitive;
      data.playtime = user.profile.playtime.competitive;
      data.rank = user.profile.competitive.rank;
      data.level = data.icon.level;
      data.top_heroes = user.stats.stats.top_heroes.competitive;
      data.stats = {};
      data.stats.combat = user.stats.stats.combat.competitive;
      data.stats.deaths = user.stats.stats.deaths.competitive;
      data.stats.awards = user.stats.stats.match_awards.competitive;
      data.stats.assists = user.stats.stats.assists.competitive;
      data.stats.average = user.stats.stats.average.competitive;
      data.stats.misc = user.stats.stats.miscellaneous.competitive;
      data.stats.best = user.stats.stats.best.competitive;
      data.stats.game = user.stats.stats.game.competitive;

      return data;
    });
  }
}
