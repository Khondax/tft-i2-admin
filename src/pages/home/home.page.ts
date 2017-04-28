import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import { OrderPage } from '../pages';

 @Component ({
     templateUrl: 'home.page.html',
     selector: 'home.page.scss'
 })

 export class HomePage {

     private ordersData: any;
     orders = [];
     orderFilter: string = "notAssigned"; 
    
    constructor(private loadingController: LoadingController,
                private nav: NavController,
                public angularFire: AngularFire){ 
                        
    }



    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }

    ionViewDidLoad(){

        let loader = this.loadingController.create ({
            content: 'Obteniendo datos...',
            spinner: 'bubbles'
        });

        loader.present().then(() => { 
            this.angularFire.database.list('/pedidos').subscribe(data => {
                this.ordersData = _.chain(data)
                                  .groupBy('codigoPostal')
                                  .toPairs()
                                  .map(item => _.zipObject(['codPos', 'pedido'], item))
                                  .value();

                this.orders = this.ordersData;

                loader.dismiss();
            });
        });

    }


 }