import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CommentsPage} from '../comments/comments';
import {AngularFire} from "angularfire2";

/*
  Generated class for the TaskView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html'
})
export class TaskViewPage {
  keyTeam:any;
  task:any;
  tabBarElement:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: AngularFire) {
    this.task=navParams.get('taskParams');
    console.log(this.task);
    this.keyTeam=navParams.get('keyTeam');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  goToComments(){
    this.navCtrl.push(CommentsPage,{
      taskParams:this.task,
      keyTeam:this.keyTeam
    });
  }

  makePending(){
    console.log(this.keyTeam);
    console.log(this.task.$key);
    this.firebase.database.object('/teams/'+this.keyTeam+'/tasks/'+this.task.$key).update({state: "Pendiente"}).then(success => {
      this.navCtrl.pop();
    }).catch(error => {
      console.log(error);
    });
  }

  makeInProgress(){
    this.firebase.database.object('/teams/'+this.keyTeam+'/tasks/'+this.task.$key).update({state: "En Proceso"}).then(success => {
      this.navCtrl.pop();
    }).catch(error => {
      console.log(error);
    });
  }

  makeDone(){
    this.firebase.database.object('/teams/'+this.keyTeam+'/tasks/'+this.task.$key).update({state: "Hecho"}).then(success => {
      this.navCtrl.pop();
    }).catch(error => {
      console.log(error);
    });
  }
}

