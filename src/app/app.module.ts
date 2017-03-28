import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from '../pages/intro/intro';
import {Accounts} from '../providers/accounts';

import { AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyAE-Uwac89BS0wsECCE7fnDC1t0LY0LZIQ",
  authDomain: "slackello-14e3e.firebaseapp.com",
  databaseURL: "https://slackello-14e3e.firebaseio.com",
  storageBucket: "slackello-14e3e.appspot.com",
  messagingSenderId: "203288553819"
}

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,Accounts),
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
