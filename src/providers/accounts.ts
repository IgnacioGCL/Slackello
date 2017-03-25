import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController,AlertController, NavParams,ToastController } from 'ionic-angular';

import {AngularFire} from 'angularfire2';


/*
  Generated class for the Accounts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Accounts {

  constructor(public http: Http,public firebase:AngularFire,public alertCtrl:AlertController, public toast:ToastController) {
    console.log('Hello Accounts Provider');
  }


}
