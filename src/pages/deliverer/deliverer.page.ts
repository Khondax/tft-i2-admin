import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { OrderPage } from '../pages';

 @Component ({
     templateUrl: 'deliverer.page.html',
 })

 export class DelivererPage {

    deliverer: any;
    orders = [];
    vehicles = [];
    vehiclesDatabase: FirebaseListObservable<any>;
    deliveryMen: FirebaseListObservable<any>;

    constructor(public nav: NavController,
                public navParams: NavParams,
                public loadingController: LoadingController,
                public toastController: ToastController,
                public angularFire: AngularFire,
                public alertController: AlertController){

        this.deliverer = this.navParams.data;

    }

    ionViewDidLoad(){
        let loader = this.loadingController.create({
            content: 'Cargando...',
            spinner: 'bubbles'
        });

        loader.present().then(() => {
            this.angularFire.database.list('/pedidos', {
                query: {
                    orderByChild: 'idRepartidor',
                    equalTo: this.deliverer.$key
                }
            }).subscribe(data => {
                var i:number;
                for(i = 0; i < data.length; i++){
                    if(data[i].fechaEntrega == ""){
                        this.orders[i] = data[i];
                    }
                }

                //this.orders = data;
                
            });

            this.angularFire.database.list('/coches', {
                query: {
                    orderByChild: 'disponibilidad',
                    equalTo: "Libre"
                }
            }).subscribe(data => {
                this.vehicles = data;

                this.vehiclesDatabase = this.angularFire.database.list('/coches');
                this.deliveryMen = this.angularFire.database.list('/repartidores');
                
                loader.dismiss();
            });
            
        });
    }


    addCar($event, vehicle){
        let prompt = this.alertController.create({
            title: 'Asignar',
            message: "¿Quieres añadir el vehículo con matrícula " + vehicle.matricula + " a este repartidor? ",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancelado');
                    }
                },
                {
                    text: 'Si',
                    handler: data =>{

                        this.deliveryMen.update(this.deliverer.$key, {coche: vehicle.matricula});
                        this.vehiclesDatabase.update(vehicle.$key, {repartidor: this.deliverer.nombre,  disponibilidad: "Ocupado"});

                        this.nav.pop();

                        let toast = this.toastController.create({
                            message: "Se ha asignado el vehículo " + vehicle.matricula + " al repartidor ",
                            duration: 4000,
                            position: 'bottom'
                        });

                        toast.present();
                    }
                }
            ]
        });

        prompt.present();

    }


    removeCar(){

        this.angularFire.database.list('/coches', { 
            query: {
                orderByChild: 'matricula',
                equalTo: this.deliverer.coche,
            }
        }).subscribe(data => {
            console.log(data);

            this.vehiclesDatabase.update(data[0].$key, {repartidor: "", disponibilidad: "Libre"});
        });

        this.deliveryMen.update(this.deliverer.$key, {coche: ""});

        let toast = this.toastController.create({
            message: "Se ha desasignado el vehículo al repartidor",
            duration: 4000,
            position: 'bottom'
        });

        toast.present();

    }


    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }


 }