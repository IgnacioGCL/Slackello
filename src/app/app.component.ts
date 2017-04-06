import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {IntroPage} from '../pages/intro/intro';
import {TeamsPage} from "../pages/teams/teams";
import {OneSignal} from '@ionic-native/onesignal';
import {AngularFire} from "angularfire2";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = IntroPage;
  user: string[] = [null];

  constructor(private platform: Platform, private _OneSignal: OneSignal, private firebase: AngularFire) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initializePush();
    });

    localStorage.getItem("user_uid") ? this.user[0] = localStorage.getItem("user_uid") : this.user[0] = null;

    // TODO: arreglar redirección al loguear
    if (this.user[0] == null) {
      //this.nav.setRoot(IntroPage);
      this.rootPage = IntroPage;
    } else {
      //this.nav.setRoot(Page1);
      this.rootPage = TeamsPage;
    }
  }

  initializePush() {
    this._OneSignal.startInit("f0184206-6e55-4d50-9f3f-056840f2a359", "203288553819");
    this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
    this._OneSignal.setSubscription(true);
    this._OneSignal.handleNotificationReceived().subscribe(() => {
      // handle received here how you wish.
    });
    this._OneSignal.handleNotificationOpened().subscribe(() => {
      // handle opened here how you wish.
    });
    this._OneSignal.getIds().then(result => {
      console.log(localStorage.getItem("user_uid"));
      console.log(result.pushToken);
      this.firebase.database.object('/users/' + localStorage.getItem("user_uid") + '/pushToken').set(result.pushToken).then(() => {
        console.log("Success");
      }).catch(() => {
        console.log("User not logged");
      });
    });
    this._OneSignal.endInit();
  }
}
