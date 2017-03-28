import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PendingPage} from "../pending/pending";

/*
  Generated class for the AddTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})
export class AddTaskPage {
  users:any;
  states:any;
  task={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.states=["Pendiente","En Proceso","Hecho"];
    this.users=["Diego"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }
  addTask(){
    console.log(this.task);
    this.navCtrl.push(PendingPage);
  }
}
