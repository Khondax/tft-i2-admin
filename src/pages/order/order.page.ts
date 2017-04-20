import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { MapPage } from '../pages';

 @Component ({
     templateUrl: 'order.page.html',
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
        this.orders = angularFire.database.list('/pedidos');
        this.employees = angularFire.database.list('/repartidores');

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
                loader.dismiss();
            });
        });

     }

    goToMap(){
        this.nav.push(MapPage, this.order);
    }

    getCorrectColor(deliveryMan){
        return deliveryMan.disponibilidad === "Ocupado" ? 'primary' : 'verde';
    }

    assignDeliveryMan($event, deliveryMan){
        /*  TODO: Editar base de datos para añadir repartidor al paquete seleccionado
        *   Editar base de datos para que el repartidor tenga otro paquete
        *   En HomePage, los paquetes con repartidor no pueden verse (Refresher automático) 
        *   Añadir Toast para indicar que el repartidor se ha añadido al pedido
        */

        let prompt = this.alertController.create({
            title: 'Asignar',
            message: "¿Quieres añadir el repartidor " + deliveryMan.nombre + " al pedido? ",
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

                        this.orders.update(this.order.$key, {repartidor: deliveryMan.nombre, idRepartidor: deliveryMan.$key, estado: "Asignado"});
                        this.employees.update(deliveryMan.$key, {numPedidos: deliveryMan.numPedidos+1});

                        this.nav.popToRoot();

                        let toast = this.toastController.create({
                            message: "Se ha asignado el paquete " + this.order.$key + " al repartidor " + deliveryMan.nombre,
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
        
        this.orders.update(this.order.$key, {repartidor: "", estado: "En el almacén"});
        var numOrders = 0;
        var deliveryMan = this.angularFire.database.object(`repartidores/${this.order.idRepartidor}`).subscribe((deliveryMan) =>
                numOrders = deliveryMan.numPedidos-1
        );
        this.employees.update(this.order.idRepartidor, {numPedidos: numOrders})

        this.nav.popToRoot();

        let toast = this.toastController.create({
            message: "Se ha desasignado el paquete " + this.order.$key + " del repartidor " + this.order.repartidor,
            duration: 4000,
            position: 'bottom'
        });

        toast.present();

    }


 }