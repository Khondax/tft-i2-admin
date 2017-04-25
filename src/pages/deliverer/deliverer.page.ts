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
                this.orders = data;

            });

            this.angularFire.database.list('/coches', {
                query: {
                    orderByChild: 'disponibilidad',
                    equalTo: "Libre"
                }
            }).subscribe(data => {
                this.vehicles = data;

                loader.dismiss();
            });
            
        });
    }


    getCorrectColor(deliveryMan){

    }


    addCar($event, deliveryMan){
        
    }


    removeCar($event, deliveryMan){

    }

    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }


 }