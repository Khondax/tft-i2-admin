import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage, DeliveryManPage, NewOrderPage, RegistryPage, OrderPage, MapPage } from "../pages/pages";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { GoogleMaps } from "@ionic-native/google-maps";

import { AngularFireModule } from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyDka8ZQF6bzjPhVJMZFAf7d0BBztxP_spg",
    authDomain: "app-repartos-tft.firebaseapp.com",
    databaseURL: "https://app-repartos-tft.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "1059307361256"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        OrderPage,
        DeliveryManPage,
        NewOrderPage,
        RegistryPage,
        MapPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)
     ],
     bootstrap: [IonicApp],
     entryComponents: [
        MyApp,
        HomePage,
        OrderPage,
        DeliveryManPage,
        NewOrderPage,
        RegistryPage,
        MapPage,
    ],
    providers: [
        BarcodeScanner,
        GoogleMaps,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule { }
