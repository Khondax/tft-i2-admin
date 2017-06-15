import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../pages';
import { EmailValidator } from '../../validators/email';

@Component({
  templateUrl: 'login.page.html',
  selector: 'login.page.scss'
})


export class LoginPage {

  public loginForm: any;
  public loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public menuController: MenuController) {

      this.menuController.enable(false);

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    loginUser(){
      if (!this.loginForm.valid){
         if(this.loginForm.value.password.length < 6){
          let alert = this.alertCtrl.create({
              message: "La contraseña debe tener al menos 6 caracteres",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
        }else{
          let alert = this.alertCtrl.create({
              message: "No es una dirección de correo electrónico",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
        }
        
      } else {
        if(this.loginForm.value.email != "admin@administrador.es"){
          let alert = this.alertCtrl.create({
              message: "El email es incorrecto",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
        }else{
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
          .then( authData => {
            this.navCtrl.insert(0,HomePage);
            this.navCtrl.popToRoot();
          }, error => {
              let alert = this.alertCtrl.create({
                message: "La contraseña es incorrecta",
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
          });
        }
        
      }
  }

}