import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

  count: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: AngularFire, private firebase1: AngularFire, public alertCtrl: AlertController) {
  }

  createTeam() {
    let popup = this.alertCtrl.create({
      title: 'Crear equipo',
      message: 'Introduzca el correo de los ',
      inputs: [
        {
          name: 'nombreProyecto',
          placeholder: 'Nombre del proyecto'
        },
        {
          name: 'nombreUsuario1',
          placeholder: 'Correo de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Añadir usuario',
          handler: () => {
            this.count++;
            popup.addInput({
              name: 'nombreUsuario' + this.count,
              placeholder: 'Correo de usuario'
            });
            return false;
          }
        },
        {
          text: 'Crear proyecto',
          handler: information => {
            this.count = 1;
            this.addTeamToFirebase(information);
          }
        }
      ]
    });
    popup.present();
  }

  addTeamToFirebase(information) {
    console.log();
    this.firebase.database.list('/teams/').push({}).then((success) => {
      information['nombreUsuario0'] = localStorage.getItem("user_email");
      this.firebase.database.object('/teams/' + success.key).set(information);
    });
  }

}
