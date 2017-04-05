import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
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
  inprocess_tasks=[];
  constructor(public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.team=navParams.get('nameTeam');
    this.keyTeam=navParams.get('keyTeam');
    this.tasks=af.database.list('/teams/'+this.keyTeam+'/tasks');
    this.tasks.forEach(items=>{
      items.forEach(data_task=>{
        console.log(data_task.state);
        if(data_task.state=="En Proceso"){
          console.log("Si");
          this.inprocess_tasks.push(data_task);
        }
        console.log("Tareas en proceso "+ this.inprocess_tasks);
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InProcessPage');
  }


}
