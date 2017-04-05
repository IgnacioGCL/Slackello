import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
/*
  Generated class for the Done page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-done',
  templateUrl: 'done.html'
})
export class DonePage {
  keyTeam:String;
  tasks:FirebaseListObservable<any>;
  done_tasks=[];
  constructor(public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.keyTeam=navParams.get('keyTeam');
    this.tasks=af.database.list('/teams/'+this.keyTeam+'/tasks');
    this.tasks.forEach(items=>{
      items.forEach(data_task=>{
        console.log(data_task.state);
        if(data_task.state=="Hecho"){
          console.log("Si");
          this.done_tasks.push(data_task);
        }
        console.log("Tareas hechas "+ this.done_tasks);
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonePage');
  }

}
