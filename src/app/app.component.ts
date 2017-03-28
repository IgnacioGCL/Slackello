import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {IntroPage} from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
import {TeamsPage} from "../pages/teams/teams";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = IntroPage;
  user: string[] = [null];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
}
