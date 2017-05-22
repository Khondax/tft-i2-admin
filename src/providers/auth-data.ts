import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  fireAuth: any;

  constructor(public angularFire: AngularFire) {
    angularFire.auth.subscribe( user => {
      if (user) { this.fireAuth = user.auth; }
    });
  }

  getCurrentUid(){
    return this.angularFire.auth.getAuth().auth.uid;
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.angularFire.auth.login({
      email: newEmail,
      password: newPassword
    });
  }

  logoutUser(): firebase.Promise<any> {
    return this.angularFire.auth.logout();
  }

}