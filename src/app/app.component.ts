import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';

import { HomePage, DeliveryMenPage, RegistryPage, VehiclesPage, DelivererLocationPage, LoginPage } from '../pages/pages';
import { AngularFire } from "angularfire2";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    //rootPage: any = HomePage;
    rootPage: any;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, 
                public statusBar: StatusBar, 
                public authData: AuthData,
                public angularFire: AngularFire, 
                public splashScreen: SplashScreen,
                public alertCtrl: AlertController) {
        
        const authObserver = angularFire.auth.subscribe( user => {
            if (user) {
            this.rootPage = HomePage;
            authObserver.unsubscribe();
            } else {
            this.rootPage = LoginPage;
            authObserver.unsubscribe();
            }
        });
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    goHome(){
        this.nav.setRoot(HomePage);
    }

    goDeliverers(){
        this.nav.push(DeliveryMenPage);
    }
    
    goDelivererLocation(){
        this.nav.push(DelivererLocationPage);
    }

    goVehicles(){
        this.nav.push(VehiclesPage);
    }

    goRegistry(){
        this.nav.push(RegistryPage);
    }

    logout(){

    let alert = this.alertCtrl.create({
              message: "¿Quieres cerrar sesión?",
              buttons: [
                {
                  text: "No"
                },
                {
                  text: 'Sí',
                  handler: data =>{
                    this.authData.logoutUser();
                    this.nav.push(LoginPage);
                  }
                }
              ]
            });
            alert.present();
  }

}
