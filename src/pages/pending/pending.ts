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
  pending_tasks=[];
  tasks:FirebaseListObservable<any>;
  keyTeam:any;
  params:any;
  constructor(public navCtrl: NavController,public af:AngularFire, public navParams: NavParams) {
    this.keyTeam=navParams.get('keyTeam');
    console.log("Key de team en pending" + this.keyTeam);
    this.tasks=af.database.list('/teams/'+this.keyTeam+'/tasks');
    this.tasks.forEach(items=>{
      items.forEach(data_task=>{
        console.log(data_task.state);

        if(data_task.state=="Pendiente"){
          console.log("Si");
          this.pending_tasks.push(data_task);
        }
        console.log("Tareas pendientes "+ this.pending_tasks);
      })
    })
    //this.tasks=af.database.list('/teams/'+team_id);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }

  viewTask(task){
    this.navCtrl.push(TaskViewPage,{
      taskParams:task,
      keyTeam:this.keyTeam
    });
  }
}

