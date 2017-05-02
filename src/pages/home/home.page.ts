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
     nAssignedOrders = [];
     assignedOrders = [];
     orders = [];
     orderFilter: string = "notAssigned";
     queryText: string = "";
    
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

                var index = 0;
                var index2 = 0;
                for(var i = 0; i < this.ordersData.length; i++){
                    var indexTemp = 0;
                    var indexTempA = 0;
                    var temp = [];
                    var tempAssign = [];
                    for(var j = 0; j < this.ordersData[i].pedido.length; j++){
                        if(this.ordersData[i].pedido[j].estado == "En el almacén"){
                            temp[indexTemp] = this.ordersData[i].pedido[j];
                            indexTemp++;
                        }else if (this.ordersData[i].pedido[j].estado == "Asignado") {
                            tempAssign[indexTempA] = this.ordersData[i].pedido[j];
                            indexTempA++;
                        }
                    }
                    
                    this.nAssignedOrders[index] =  _.chain(temp)
                                                    .groupBy('direccion')
                                                    .toPairs()
                                                    .map(item => _.zipObject(['dir', 'pedido'], item))
                                                    .value();
                    index++;        

                
                    this.assignedOrders[index2] = _.chain(tempAssign)
                                                    .orderBy('direccion')
                                                    .value();;
                    index2++;
                }
                
                //this.orders = this.ordersData;
                loader.dismiss();
            });
        });
    }

    search(){
        let queryTextLower = this.queryText.toLowerCase();
        let filteredOrders = [];
        
        _.forEach(this.nAssignedOrders, dat => {
            let orders = _.filter(dat => dat.repartidor.toLowerCase()
            .includes(queryTextLower) || dat.remitente.toLowerCase()
            .includes(queryTextLower) || dat.idPaquete.toString().includes(queryTextLower));
            if (orders.length) {
                filteredOrders.push({orders});
            }
        });

        this.nAssignedOrders = filteredOrders;
    }
 }