import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, DeliveryManPage, RegistryPage, VehiclesPage } from '../pages/pages';

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

    goDeliverers(){
        this.nav.push(DeliveryManPage);
    }

    goVehicles(){
        this.nav.push(VehiclesPage);
    }

    goRegistry(){
        this.nav.push(RegistryPage);
    }

}
