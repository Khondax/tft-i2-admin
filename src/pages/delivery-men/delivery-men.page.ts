import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { DelivererHomePage, DelivererLocationPage } from '../pages';

 @Component ({
     templateUrl: 'delivery-men.page.html',
 })

export class DeliveryMenPage {
     
    deliveryMen = [];
    private allMen: any;
    
    carsData: any;
    car = [];

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

                this.vehiclesDatabase = this.angularFire.database.list('/coches');
                this.deliveryMenDatabase = this.angularFire.database.list('/repartidores');

                loader.dismiss();
            });
        }); 
    
    }


    getCorrectColor(deliveryMan){
        return deliveryMan.disponibilidad === "En ruta" ? 'primary' : 'verde';
    }


    goToDeliverer($event, deliveryMan){
        this.nav.push(DelivererHomePage, deliveryMan);
    }

    goDelivererLocation(){
        this.nav.push(DelivererLocationPage);
    }

    removeCar($event, deliverer){

        this.angularFire.database.list('/coches').subscribe(data =>{
            this.carsData = _.chain(data)
                            .filter(c => c.matricula === deliverer.coche)
                            .value();

            this.vehiclesDatabase.update(this.carsData[0].$key, {repartidor: "", disponibilidad: "Libre"});
        });

        
        this.deliveryMenDatabase.update(deliverer.$key, {coche: ""});
        

        let toast = this.toastController.create({
            message: "Se ha desasignado el vehículo al repartidor",
            duration: 4000,
            position: 'bottom'
        });

        toast.present();

    }



}