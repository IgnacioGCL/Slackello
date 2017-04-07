import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {TaskViewPage} from '../task-view/task-view';
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
  keyTeam:any;
  tasksLength:number;
  constructor(public navCtrl: NavController,public af:AngularFire, public navParams: NavParams) {
    this.keyTeam=navParams.get('keyTeam');
    this.tasksLength=0;
    this.tasks=af.database.list('/teams/'+this.keyTeam+'/tasks');
    this.tasks.subscribe(tasks=>{
      tasks.forEach(task=>{
        if(task.state=="Pendiente"){
          this.tasksLength++;
        }
      })

    })
  }

  viewTask(task){
    this.navCtrl.push(TaskViewPage,{
      taskParams:task,
      keyTeam:this.keyTeam
    });
  }
  ionViewWillEnter(){
    this.tasksLength=0;
    this.tasks.subscribe(tasks=> {
      tasks.forEach(task => {
        if (task.state == "Pendiente") {
          this.tasksLength++;
        }
      })
    });
  }
}

