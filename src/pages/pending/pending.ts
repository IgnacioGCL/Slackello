import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
/*
  Generated class for the Pending page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html'
})
export class PendingPage {
  nameTeam:String;
  tasks:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public af:AngularFire, public navParams: NavParams) {
    this.nameTeam=navParams.get('nameTeam');
    this.tasks=af.database.list('/teams');
    console.log(this.nameTeam);
    //this.tasks=af.database.list('/teams/'+team_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }
  showPendingTasks(){

  }

}
