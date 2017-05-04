import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";
import _ from 'lodash';

import { OrderPage } from "../pages";


 @Component ({
     templateUrl: 'delivererPacks.page.html'
 })

 export class DelivererPacksPage {
         
    ordersData: any;
    orders = [];
    deliverer: any = {};

    constructor (public nav: NavController,
                 public navParams: NavParams,
                 public angularFire: AngularFire,){
               
    }

    ionViewDidLoad(){
         this.deliverer = this.navParams.data;

         this.angularFire.database.list('/pedidos').subscribe(data => {
                this.ordersData = _.chain(data)
                                    .filter(o => o.idRepartidor === this.deliverer.$key && o.fechaEntrega === "")
                                    .value();

                this.orders = this.ordersData;
            });
    }

    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }

 }