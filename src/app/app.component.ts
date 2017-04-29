import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, DeliveryMenPage, RegistryPage, VehiclesPage, DelivererLocationPage } from '../pages/pages';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
    /*    this.pages = [
        { title: 'Repartidores', component: DeliveryManPage },
        { title: 'Vehiculos', component: VehiclesPage },
        { title: 'Historial', component: RegistryPage },
        ];*/

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    /*  openPage(page) {
        // Reset the content nav to have just this page
        
        this.nav.push(page.component);
    }*/

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

}
