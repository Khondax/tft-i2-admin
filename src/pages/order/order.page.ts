import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { MapPage } from '../pages';

 @Component ({
     templateUrl: 'order.page.html',
     selector: 'order.page.scss'
 })

 export class OrderPage {

    order: any;
    deliveryMen = [];
    private allMen: any;
    orders: FirebaseListObservable<any>;
    employees: FirebaseListObservable<any>;

    constructor(public nav: NavController, 
                public navParams: NavParams,
                public toastController: ToastController,
                public angularFire: AngularFire,
                public alertController: AlertController,
                public loadingController: LoadingController){
        
        this.order = this.navParams.data;

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
                    .orderBy('numPedidos')
                    .value();

                this.deliveryMen = this.allMen;
                
                this.orders = this.angularFire.database.list('/pedidos');
                this.employees = this.angularFire.database.list('/repartidores');
                loader.dismiss();
            });
        });

     }

    goToMap(){
        this.nav.push(MapPage, this.order);
    }

    getCorrectColor(deliveryMan){
        return deliveryMan.disponibilidad === "En ruta" ? 'primary' : 'verde';
    }

    assignDeliveryMan($event, deliveryMan){

        let prompt = this.alertController.create({
            title: 'Asignar',
            message: "¿Quieres asisgar este pedido al repartidor " + deliveryMan.nombre + "?",
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Si',
                    handler: data =>{

                        this.orders.update(this.order.$key, {repartidor: deliveryMan.nombre, idRepartidor: deliveryMan.$key, estado: "Asignado"});
                        this.employees.update(deliveryMan.$key, {numPedidos: deliveryMan.numPedidos+1});

                        this.nav.popToRoot();

                        let toast = this.toastController.create({
                            message: "Se ha asignado el paquete " + this.order.idPaquete + " al repartidor " + deliveryMan.nombre,
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

    removeDeliveryMan(){
        
        this.orders.update(this.order.$key, {repartidor: "", estado: "En el almacén", idRepartidor: ""});
        var numOrders = 0;
        var deliveryMan = this.angularFire.database.object(`repartidores/${this.order.idRepartidor}`).subscribe((deliveryMan) =>
                numOrders = deliveryMan.numPedidos-1
        );
        this.employees.update(this.order.idRepartidor, {numPedidos: numOrders})

        deliveryMan.unsubscribe();
        this.nav.popToRoot();

        let toast = this.toastController.create({
            message: "Se ha desasignado el paquete " + this.order.idPaquete + " del repartidor " + this.order.repartidor,
            duration: 4000,
            position: 'bottom'
        });

        toast.present();

    }

    addComment(){
        let prompt = this.alertController.create({
            title: 'Incidencia',
            message: "Describe aquí la incidencia del paquete " + this.order.idPaquete,
            inputs: [{
                type: 'text',
                name: 'incidencia'
            }],
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Añadir',
                    handler: data =>{

                        this.orders.update(this.order.$key, {observaciones: data.incidencia, estado: "Incidencia registrada"});

                        this.nav.popToRoot();

                        let toast = this.toastController.create({
                            message: "Se ha regsitrado la incidencia",
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


 }