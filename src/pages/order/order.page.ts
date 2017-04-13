import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import { MapPage } from '../pages';

 @Component ({
     templateUrl: 'order.page.html',
 })

 export class OrderPage {

    order: any;
    deliveryMen: FirebaseListObservable<any>;

    constructor(private nav: NavController, 
                private navParams: NavParams,
                private angularFire: AngularFire){

        this.order = this.navParams.data;
        this.deliveryMen = angularFire.database.list('/repartidores');
     }


    goToMap(){
    this.nav.push(MapPage, this.order);
    }

getCorrectColor(deliveryMan){
    return deliveryMan.disponibilidad === "Ocupado" ? 'primary' : 'verde';
  }



 }