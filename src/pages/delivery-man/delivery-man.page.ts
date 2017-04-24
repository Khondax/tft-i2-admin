import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import {  } from '../pages';

 @Component ({
     templateUrl: 'delivery-man.page.html',
 })

 export class DeliveryManPage {

     deliveryMen = [];
     private allMen: any;

     deliveryMenDatabase: FirebaseListObservable<any>;
     vehiclesDatabase: FirebaseListObservable<any>;


    constructor(public nav: NavController,
                public loadingController: LoadingController,
                public angularFire: AngularFire){

        this.deliveryMenDatabase = angularFire.database.list('/repartidores');
        this.vehiclesDatabase = angularFire.database.list('/coches');

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
                loader.dismiss();
            });
        }); 
    
    }

    getCorrectColor(deliveryMan){
        return deliveryMan.disponibilidad === "Ocupado" ? 'primary' : 'verde';
    }

    addCar(deliveryMan){

    }

    removeCar(deliveryMan){
        
    }



 }