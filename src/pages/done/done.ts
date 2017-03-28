import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddTaskPage} from '../add-task/add-task';
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
  project:String;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project="Proyecto 1";
  }
  addNewTask(){
    this.navCtrl.push(AddTaskPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DonePage');
  }

}
