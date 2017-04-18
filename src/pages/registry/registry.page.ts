import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import {  } from '../pages';

 @Component ({
     templateUrl: 'registry.page.html'
 })

 export class RegistryPage {

    orders: FirebaseListObservable<any>;

    constructor(public nav: NavController,
                public alertController: AlertController,
                public angularFire: AngularFire){

        this.orders = angularFire.database.list('/pedidos');

    }

    //TODO Importar datos de paquetes entregados de firebase


 }