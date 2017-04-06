import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DonePage } from '../pages/done/done';
import { InProcessPage } from '../pages/in-process/in-process';
import { PendingPage } from '../pages/pending/pending';
import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from '../pages/intro/intro';
import {Accounts} from '../providers/accounts';
import {AddTaskPage} from '../pages/add-task/add-task';
import {TaskViewPage} from '../pages/task-view/task-view';
import { AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';
import {TeamsPage} from "../pages/teams/teams";

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
    DonePage,
    PendingPage,
    InProcessPage,
    TabsPage,
    IntroPage,
    AddTaskPage,
    TeamsPage,
    TaskViewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,Accounts),
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DonePage,
    PendingPage,
    InProcessPage,
    TabsPage,
    IntroPage,
    AddTaskPage,
    TeamsPage,
    TaskViewPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
