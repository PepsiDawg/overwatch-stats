import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OverwatchServices {
    private _profileURL = "https://ow-user-api.herokuapp.com/profile/pc/us/";
    private _statURL = "https://ow-user-api.herokuapp.com/stats/pc/us/";
    private _maps: string[] = [
        "Dorado",
        "Eichenwalde",
        "Hanamura",
        "Hollywood",
        "Ilios",
        "King's Row",
        "Lijiang Tower",
        "Nepal",
        "Numbani",
        "Oasis",
        "Route 66",
        "Temple of Anubis",
        "Volskaya Industries",
        "Watchpoint: Gibraltar",
        "Horizon: Lunar Colony"
    ];
    private clientCurrentSeason = -1;


    constructor(private _http: Http) {

    }

    getUserProfile(id: string) {
        return this._http.get(this._profileURL + id)
           .map(res => res.json());
    }

    getUserStats(id: string) {
        return this._http.get(this._statURL + id)
            .map(res => res.json());
    }

    getMaps() {
        return Observable.of(this._maps);
    }

    setClientCurrentSeason(season) {
        this.clientCurrentSeason = season;
    }

    getClienCurrentSeason() {
        return Observable.interval(250)
            .map(() => this.clientCurrentSeason)
            .distinctUntilChanged();
    }
}
