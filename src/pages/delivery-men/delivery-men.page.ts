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


    goToDeliverer($event, deliveryMan){
        this.nav.push(DelivererPage, deliveryMan);
    }



 }