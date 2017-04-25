import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import {  } from '../pages';

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

        this.angularFire.database.list('/coches', {
            query: {
                orderByChild: 'disponibilidad',
                equalTo: 'Libre'
            }
        }).subscribe(data => {

            let prompt = this.alertController.create({
                title: 'Elegir vehiculo',
                message: 'Seleccione el vehículo que quiere asignar al repartidor ' + deliveryMan.nombre
            });

            for (var index = 0; index < data.length; index++) {
                prompt.addInput({
                    type: 'radio',
                    label: data[index].matricula,
                    value: data[index],
                    checked: false
                });
            }

            prompt.addButton('Cancelar');
            prompt.addButton({
                text: 'Asignar',
                handler: dat => {
                    this.deliveryMenDatabase.update(deliveryMan.$key, {coche: dat.matricula});
                    
                    //TODO: Esta linea causa problemas porque cambiamos la disponibilidad mientras se está observando la base de datos
                    //this.vehiclesDatabase.update(dat.$key, {repartidor: deliveryMan.nombre, disponibilidad: "Ocupado"});

                }
            });

            prompt.present();
        });
        
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



 }