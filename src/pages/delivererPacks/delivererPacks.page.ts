import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire } from "angularfire2";
import _ from 'lodash';

import { OrderPage } from "../pages";

 @Component ({
     templateUrl: 'delivererPacks.page.html'
 })

 export class DelivererPacksPage {
         ordersGroup: any;
         
    ordersData: any;
    orders = [];
    deliverer: any = {};
    map: any = {};

    constructor (public nav: NavController,
                 public navParams: NavParams,
                 public angularFire: AngularFire,){
               
    }

    ionViewDidLoad(){
         this.deliverer = this.navParams.data;

         this.map = {
                    lat: 27.942246703329612,
                    lng: -15.598526000976562,
                    zoom: 9
            };

         this.angularFire.database.list('/pedidos').subscribe(data => {

                this.ordersData = _.chain(data)
                                  .filter(o => o.idRepartidor === this.deliverer.$key && o.fechaEntrega === "")
                                  .groupBy('codigoPostal')
                                  .toPairs()
                                  .map(item => _.zipObject(['codPos', 'pedido'], item))
                                  .value();

                this.orders = _.chain(this.ordersData)
                                    .orderBy('direccion')
                                    .value();
            });
    }

    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }

 }