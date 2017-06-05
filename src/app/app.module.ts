import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage, DeliveryMenPage, RegistryPage, OrderPage, MapPage, VehiclesPage, DelivererPage, DelivererLocationPage, DelivererHomePage, DelivererPackFinishPage, DelivererPacksPage, LoginPage } from "../pages/pages";

import { AuthData } from '../providers/auth-data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgmCoreModule } from "@agm/core";

import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";


export const firebaseConfig = {
    apiKey: "AIzaSyDka8ZQF6bzjPhVJMZFAf7d0BBztxP_spg",
    authDomain: "app-repartos-tft.firebaseapp.com",
    databaseURL: "https://app-repartos-tft.firebaseio.com",
    projectId: "app-repartos-tft",
    storageBucket: "app-repartos-tft.appspot.com",
    messagingSenderId: "1059307361256"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        OrderPage,
        DeliveryMenPage,
        RegistryPage,
        MapPage,
        VehiclesPage,
        DelivererPage,
        DelivererLocationPage,
        DelivererHomePage,
        DelivererPacksPage,
        DelivererPackFinishPage,
        LoginPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            scrollAssist: false, 
            autoFocusAssist: false
        }),
        BrowserModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBXhy5nvQy6bLf9B-FCTqyOk78Py9L-b4U'
        }),
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
     ],
     bootstrap: [IonicApp],
     entryComponents: [
        MyApp,
        HomePage,
        OrderPage,
        DeliveryMenPage,
        RegistryPage,
        MapPage,
        VehiclesPage,
        DelivererPage,
        DelivererLocationPage,
        DelivererHomePage,
        DelivererPacksPage,
        DelivererPackFinishPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen, 
        AuthData,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule { }