import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddTaskPage} from '../add-task/add-task';
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
  project:String;
  tasks:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public af:AngularFire, public navParams: NavParams) {
    this.project="Proyecto 1";
    this.tasks=af.database.list('/teams');
    //this.tasks=af.database.list('/teams/'+team_id);
  }
  addNewTask(){
    this.navCtrl.push(AddTaskPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }
  showPendingTasks(){

  }

}
