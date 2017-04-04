import {Component} from '@angular/core';
import {NavController,AlertController, MenuController, ToastController} from 'ionic-angular';

//import {IntroPaciente} from '../pantalla-medico/pantalla-medico';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {CreateUserPage} from '../create-user/create-user';
import {TabsPage} from '../tabs/tabs';

/*
 Generated class for the Intro page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
  saludo: string;
  tipo: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController,private firebase: AngularFire,public alertCtrl: AlertController, public menu: MenuController, public toast: ToastController) {
    this.saludo = 'Entrar'
    this.menu.enable(false);

  }

  submitForm(form: any) {
    this.firebase.auth.login(
      {
        email: form.value.email,
        password: form.value.password
      }).then(
      (success) => {
        this.tipo = this.firebase.database.object('/users/' + success.uid, {preserveSnapshot: true});
        localStorage.setItem("user_uid", success.uid);
        this.tipo.subscribe(snapshot => {
          localStorage.setItem("user_type", snapshot.val());
          this.navCtrl.setRoot(TabsPage);
        });
      }
    ).catch(
      (error) => {
        switch (error.message) {
          case "There is no user record corresponding to this identifier. The user may have been deleted.":
            // Cambiar por toast
            this.writeToast('Este correo no se corresponde con ningún usuario');
            break;
          case "The password is invalid or the user does not have a password.":
            // Cambiar por toast
            this.writeToast('La contraseña no coincide');
            break;
        }
      }
    );
  }


  ionViewDidEnter() {
    this.menu.close('menu1');
    //this.menu.enable(false);
  }

  ionViewWillLeave() {
    //this.menu.enable(true);
  }
  createAccount() {
    let popup2 = this.alertCtrl.create({
      title: 'Crear Cuenta',
      message: 'Introduzca los datos para crear un nuevo usuario',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
        {
          name: 'contraseña',
          placeholder: 'Contraseña',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Crear cuenta',
          handler: information => {
            this.createNewUser(information.nombre,information.email, information.contraseña);
          }
        }
      ]
    });
    popup2.present();
  }

  //Crea la cuenta en firebase
  createNewUser(name,email, password) {
    this.firebase.auth.createUser({
      email: email,
      password: password
    }).then((sucess)=>{
      this.firebase.database.object('/users/' + sucess.uid).set({
        name: name
      }).then(()=>{
        this.writeToast("Cuenta creada correctamente");
      });
    });
  }

  writeToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
