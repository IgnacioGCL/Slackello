import { Component } from '@angular/core';
import {AddTaskPage} from '../add-task/add-task';
import { DonePage } from '../done/done';
import { PendingPage } from '../pending/pending';
import { InProcessPage } from '../in-process/in-process';
import {NavController, NavParams} from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = PendingPage;
  tab2Root: any = InProcessPage;
  tab3Root: any = DonePage;
  nameTeam:any;
  keyTeam:any;
  params:any;

  constructor(public navParams:NavParams,public navCtrl:NavController) {
    this.nameTeam=navParams.get('nameTeam');
    this.keyTeam=navParams.get('keyTeam');
    //Pasar parametros a todos los tabs para coger KeyTeam
    this.navParams=navParams;
    console.log(this.navParams);
    this.params=this.navParams.data;
  }
  addNewTask(){
    this.navCtrl.push(AddTaskPage,{
      keyTeam:this.keyTeam,
      nameTeam:this.nameTeam
    });
  }
}
