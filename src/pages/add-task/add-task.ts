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
  users_team=[];
  users:any;
  states:any;
  keyTeam:any;
  items_teams:any;
  nameTeam:any;
  task={};
  constructor(public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.states=["Pendiente","En Proceso","Hecho"];
    this.nameTeam=navParams.get('nameTeam');
    this.keyTeam=navParams.get('keyTeam');
    //Emails  integrantes del equipo
    this.items_teams=af.database.list('/teams/'+this.keyTeam);
    this.items_teams.forEach(item=>{
      item.forEach(item=>{
        if(item.$key!='nombreProyecto') {
          this.emails_team.push(item.$value);
        }
      })
    })
    this.users=af.database.list('/users');
    this.users.forEach(items=>{
      items.forEach(user=>{
        this.emails_team.forEach(email=>{
          if(email==user.email){
            this.users_team.push(user.name);

          }
        })
      })
    })
    console.log(this.emails_team);
    console.log(this.users_team);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }
  addTask(){
    this.af.database.list('/teams/'+this.keyTeam+'/tasks').push(this.task);
    console.log(this.task);
    this.navCtrl.pop();
  }
}
