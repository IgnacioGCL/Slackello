import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from '../pages/intro/intro';
import {AngularFireModule,AuthMethods,AuthProviders} from 'angularfire2';
import {Accounts} from '../providers/accounts';

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
export const firebaseConfig={
  apiKey: "AIzaSyDwJUVbnD0SNjOqyUT-6ueGuMG1wlQF8V4",
  authDomain: "daw-ionic.firebaseapp.com",
  databaseURL: "https://daw-ionic.firebaseio.com",
  storageBucket: "daw-ionic.appspot.com",
  messagingSenderId: "694391426507"
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
