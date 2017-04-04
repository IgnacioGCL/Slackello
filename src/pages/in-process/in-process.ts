import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddTaskPage} from '../add-task/add-task';
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
  project:String
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project="Proyecto 1"
  }
  addNewTask(){
    this.navCtrl.push(AddTaskPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InProcessPage');
  }
  showInProcessTasks(){

  }

}
