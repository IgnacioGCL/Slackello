import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {TaskViewPage} from '../task-view/task-view';
import { IonicApp} from 'ionic-angular';
/*
  Generated class for the InProcess page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-in-process',
  templateUrl: 'in-process.html'
})
export class InProcessPage {
  team:any;
  keyTeam:any;
  tasks:FirebaseListObservable<any>;
  constructor(public app:IonicApp,public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.team=navParams.get('nameTeam');
    this.keyTeam=navParams.get('keyTeam');
    this.tasks=af.database.list('/teams/'+this.keyTeam+'/tasks');

  }

  viewTask(task){
    this.navCtrl.push(TaskViewPage,{
      taskParams:task,
      keyTeam: this.keyTeam
    });
  }

}
