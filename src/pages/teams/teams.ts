import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

  count: number = 1;
  myUid: String = localStorage.getItem("user_uid");
  teams: FirebaseListObservable<any>;
  teamsLength: number;
  constructor(private firebase: AngularFire, public alertCtrl: AlertController, public toast: ToastController) {
    this.teams = this.firebase.database.list('/users/'+this.myUid+'/teams/');
    this.teams.subscribe(teams => {
      this.teamsLength = teams.length;
    });
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
            this.verifyInformation(information);
          }
        }
      ]
    });
    popup.present();
  }

  verifyInformation(emails) {
    var onlyEmails: any[] = [];
    var found: boolean;
    var index: number = 0;
    const firebaseEmails = this.firebase.database.list('/emails/', {preserveSnapshot: true});
    firebaseEmails.subscribe(emailsTree => {
      emailsTree.forEach(function (email) {
        onlyEmails[index] = email.val();
        index++;
      });
      for (let email in emails) {
        if (email != "nombreProyecto") {
          found = _.includes(onlyEmails, emails[email]);
          console.log(found);
          if (!found) break;
        }
      }
      found ? this.addTeamToFirebase(emails) : this.writeToast("Error: Algún correo de usuario no existe");
      return;
    });
  }

  addTeamToFirebase(information) {
    this.firebase.database.list('/teams/').push({}).then((success) => {
      information['nombreUsuario0'] = localStorage.getItem("user_email");
      this.firebase.database.object('/teams/' + success.key).set(information);
      this.addTeamToUsers(information, success.key);
    });
  }

  addTeamToUsers(information, proyectKey) {
    var proyectName: String;
    this.firebase.database.list('/emails/', {preserveSnapshot: true}).subscribe((emails) => {
      for (let info in information) {
        if (info != "nombreProyecto") {
          emails.forEach(email => {
            if (email.val() == information[info]) {
              this.firebase.database.object('/users/' + email.key + '/teams/' + proyectKey).set(proyectName);
            }
          })
        } else {
          proyectName = information[info];
        }
      }
    });
    this.writeToast("Equipo creado");
  }

  writeToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
