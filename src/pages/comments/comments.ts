import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the Comments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html'
})
export class CommentsPage {
  taskParams:any;
  count:any;
  taskName:any;
  user:any;
  mensaje:String;
  items:Observable<any>;
  comments:FirebaseListObservable<any>;
  constructor(public af:AngularFire,public navCtrl: NavController, public navParams: NavParams) {
    this.mensaje="*No hay comentarios";
    //Coger nombre tarea
    this.taskParams=navParams.get('taskParams');
    this.taskName=this.taskParams.name;
    //Coger nombre usuario
    this.user=af.database.list('/users/'+localStorage.getItem('user_uid'));
    this.user.forEach(data=>{
      data.forEach(item=>{
        if(item.$key=="name"){
          this.user=item.$value;
        }
      })
    })
    //Cargar comentarios
    this.comments=af.database.list('/teams/'+navParams.get('keyTeam')+'/tasks/'+this.taskParams.$key+'/comments');
    this.comments.forEach(items=>{
      if(items.length==0){
        this.count=0;
      }else{
        this.count=items.length;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  addComments(textComment){
    console.log(textComment);
    this.comments.push({
      comment:textComment,
      author:this.user
    });
    this.items=this.comments;
  }

}
