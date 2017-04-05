import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AngularFire} from 'angularfire2';
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
  emails_team=[];
  users_team:any;
  states:any;
  keyTeam:any;
  items_teams:any;
  task={};
  constructor(public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.states=["Pendiente","En Proceso","Hecho"];
    this.keyTeam=navParams.get('keyTeam');
    //Leer integrantes del equipo
    this.items_teams=af.database.list('/teams/'+this.keyTeam);
    this.items_teams.forEach(item=>{
      item.forEach(item=>{
        if(item.$key!='nombreProyecto') {
          this.emails_team.push(item.$value);
        }
      })
    })
    console.log(this.emails_team);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }
  addTask(){
    console.log(this.task);
    this.navCtrl.push(TabsPage);
  }
}
