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
  tasksLength:number;
  constructor(public app:IonicApp,public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.team=navParams.get('nameTeam');
    this.tasksLength=0;
    this.keyTeam=navParams.get('keyTeam');
    this.tasks=af.database.list('/teams/'+this.keyTeam+'/tasks');
    this.tasks.subscribe(tasks=>{
      tasks.forEach(task=>{
        if(task.state=="En Proceso"){
          this.tasksLength++;
        }
      })
    })
  }

  viewTask(task){
    this.navCtrl.push(TaskViewPage,{
      taskParams:task,
      keyTeam: this.keyTeam
    });
  }
  ionViewWillEnter(){
    this.tasksLength=0;
    this.tasks.subscribe(tasks=> {
      tasks.forEach(task => {
        if (task.state == "En Proceso") {
          this.tasksLength++;
        }
      })
    });
  }

}
