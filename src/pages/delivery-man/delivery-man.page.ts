import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import {  } from '../pages';

 @Component ({
     templateUrl: 'delivery-man.page.html',
 })

 export class DeliveryManPage {

     //deliveryMen: FirebaseListObservable<any>;
     deliveryMen = [];
     private allMen: any;

    constructor(public nav: NavController,
                public loadingController: LoadingController,
                public angularFire: AngularFire){

       // this.deliveryMen = angularFire.database.list('/repartidores');

    }

    ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Cargando...',
      spinner: 'bubbles'
    });

    loader.present().then(() => {
        this.angularFire.database.list('/repartidores').subscribe(data => {
            this.allMen =
                _.chain(data)
                .orderBy('nombre')
                .value();

            this.deliveryMen = this.allMen;
            console.log('Datos o yo que se', this.deliveryMen);
            loader.dismiss();
        });
    }); 
    
  }

  getCorrectColor(deliveryMan){
      return deliveryMan.disponibilidad === "Ocupado" ? 'primary' : 'verde';
  }



 }