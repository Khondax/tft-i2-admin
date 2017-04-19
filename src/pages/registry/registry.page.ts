import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { OrderPage } from '../pages';

 @Component ({
     templateUrl: 'registry.page.html'
 })

 export class RegistryPage {

    //orders: FirebaseListObservable<any>;
    orders = [];
    private allOrders: any;
    private allDates: any;


    constructor(public nav: NavController,
                public alertController: AlertController,
                public angularFire: AngularFire,
                public loadingController: LoadingController){

    }

    //TODO Importar datos de paquetes entregados de firebase

    ionViewDidLoad(){

        let loader = this.loadingController.create ({
            content: 'Obteniendo datos...'
        });

        loader.present().then(() => {
            this.angularFire.database.list('/pedidos').subscribe(data => {
                this.allOrders = data;
                this.allDates = 
                    _.chain(data)
                    .groupBy('fechaEntrega')
                    .toPairs()
                    .map(item => _.zipObject(['date', 'order'],
                    item))
                    .value();

                this.orders = this.allDates;
                console.log('Datos o yo que se', this.orders);
                loader.dismiss();

            });


        });


    }

    itemTapped($event, order){

        this.nav.push(OrderPage, order);
    }


 }