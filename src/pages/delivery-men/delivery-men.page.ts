import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { DelivererPage } from '../pages';

 @Component ({
     templateUrl: 'delivery-men.page.html',
 })

 export class DeliveryMenPage {

     deliveryMen = [];
     private allMen: any;

     deliveryMenDatabase: FirebaseListObservable<any>;
     vehiclesDatabase: FirebaseListObservable<any>;

    constructor(public nav: NavController,
                public loadingController: LoadingController,
                public toastController: ToastController,
                public angularFire: AngularFire,
                public alertController: AlertController,){

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
                this.deliveryMenDatabase = this.angularFire.database.list('/repartidores');
                this.vehiclesDatabase = this.angularFire.database.list('/coches');
                loader.dismiss();
            });
        }); 
    
    }


    getCorrectColor(deliveryMan){
        return deliveryMan.disponibilidad === "Ocupado" ? 'primary' : 'verde';
    }


    removeCar($event, deliveryMan){
        this.angularFire.database.list('/coches', { 
            query: {
                orderByChild: 'matricula',
                equalTo: deliveryMan.coche,
            }
        }).subscribe(data => {
            //console.log(data)

            this.vehiclesDatabase.update(data[0].$key, {repartidor: "", disponibilidad: "Libre"});
        });

        this.deliveryMenDatabase.update(deliveryMan.$key, {coche: ""});

        let toast = this.toastController.create({
            message: "Se ha desasignado el vehículo del repartidor " + deliveryMan.nombre,
            duration: 4000,
            position: 'bottom'
        });
        toast.present();
    }


    goToDeliverer($event, deliveryMan){
        this.nav.push(DelivererPage, deliveryMan);
    }



 }