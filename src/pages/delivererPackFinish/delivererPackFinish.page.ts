import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";
import _ from 'lodash';

import { OrderPage } from "../pages";

 @Component ({
     templateUrl: 'delivererPackFinish.page.html'
 })

export class DelivererPackFinishPage {

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
                                  .groupBy('codigoPostal')
                                  .toPairs()
                                  .map(item => _.zipObject(['codPos', 'pedido'], item))
                                  .value();

                var index = 0;
                for(var i = 0; i < this.ordersData.length; i++){
                    var k = 0;
                    var temp = [];
                    for(var j = 0; j < this.ordersData[i].pedido.length; j++){
                        if(this.ordersData[i].pedido[j].fechaEntrega !="" && this.ordersData[i].pedido[j].idRepartidor == this.deliverer.$key){
                            temp[k] = this.ordersData[i].pedido[j];
                            k++;
                        }
                    }

                    this.orders[index] = temp;
                    index++;
                }
        });
    }

    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }

}