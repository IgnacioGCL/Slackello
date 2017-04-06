import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CommentsPage} from '../comments/comments';

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
  keyTask:any;
  ketTeam:any;
  task:any;
  tabBarElement:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task=navParams.get('taskParams');
    this.ketTeam=navParams.get('keyTeam');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskViewPage');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  goToComments(task){
    this.navCtrl.push(CommentsPage,{
      taskParams:this.task,
      keyTeam:this.ketTeam
    });
  }
}

