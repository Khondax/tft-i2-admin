import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

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
                public toastController: ToastController,
                public angularFire: AngularFire,
                public alertController: AlertController,){

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

    addCar($event, deliveryMan){
        
    }

    removeCar($event, deliveryMan){
        //this.deliveryMenDatabase.update(deliveryMan.$key, {coche: ""});
        var vehicle = this.angularFire.database.list('/coches', { 
            query: {
                orderByChild: 'matricula',
                equalTo: deliveryMan.coche,
            }
        }).subscribe(data => {
            console.log(data)
        });


        let toast = this.toastController.create({
            message: "Se ha desasignado el vehículo del repartidor " + deliveryMan.nombre,
            duration: 4000,
            position: 'bottom'
        });
        toast.present();
    }



 }