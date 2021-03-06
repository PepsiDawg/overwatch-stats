import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs/Rx';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _firebaseService: FirebaseService, private _router: Router, private _auth: AngularFireAuth) {

    }

    canActivate() {
        var admin =  this._auth.authState.flatMap((res, index) => {
            if(res != null) {
                return this._firebaseService.getUser(res.uid)
                        .then(result => {
                            var user = result.val();
                            return user.isAdmin;
                        });
            }
        });

        admin.subscribe(res => {
            if(!res) {
                alert("Permission denied");
                this._router.navigate(['']);
            }
        });
        return admin;
    }
}