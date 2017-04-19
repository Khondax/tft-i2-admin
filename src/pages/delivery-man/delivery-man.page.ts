import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import {  } from '../pages';

 @Component ({
     templateUrl: 'delivery-man.page.html',
 })

 export class DeliveryManPage {

     deliveryMen: FirebaseListObservable<any>;

    constructor(public nav: NavController,
                public loadingController: LoadingController,
                public angularFire: AngularFire){

        this.deliveryMen = angularFire.database.list('/repartidores');

    }

  getCorrectColor(deliveryMan){
    return deliveryMan.disponibilidad === "Ocupado" ? 'primary' : 'verde';
  }



 }