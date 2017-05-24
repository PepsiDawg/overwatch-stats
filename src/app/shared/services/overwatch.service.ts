import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OverwatchServices {
    private _profileURL = "http://ow-user-api.herokuapp.com/profile/pc/us/";
    private _statURL = "http://ow-user-api.herokuapp.com/stats/pc/us/";

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
}
