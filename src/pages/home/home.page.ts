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

     assignedOrdersData: any;
     assignedOrders = [];

     ordersError = [];
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
                var index3 = 0;
                for(var i = 0; i < this.ordersData.length; i++){
                    var indexTemp = 0;
                    var k = 0;
                    var orderError = [];
                    var temp = [];
                    for(var j = 0; j < this.ordersData[i].pedido.length; j++){
                        if(this.ordersData[i].pedido[j].observaciones !=""){
                            orderError[k] = this.ordersData[i].pedido[j];
                            k++;
                        }else if(this.ordersData[i].pedido[j].estado == "En el almacén"){
                            temp[indexTemp] = this.ordersData[i].pedido[j];
                            indexTemp++;
                        }
                    }
                    
                    this.nAssignedOrders[index] =  _.chain(temp)
                                                    .groupBy('direccion')
                                                    .toPairs()
                                                    .map(item => _.zipObject(['dir', 'pedido'], item))
                                                    .value();
                    index++;

                    this.ordersError[index3] = orderError;
                    index3++;
                }

                this.assignedOrdersData = _.chain(data)
                                          .filter(o => o.estado === "Asignado")
                                          .groupBy('repartidor')
                                          .toPairs()
                                          .map(item => _.zipObject(['repart', 'pedido'], item))
                                          .value();

                this.assignedOrders = this.assignedOrdersData;


                loader.dismiss();
            });
        });
    }

    search(){
        let queryTextLower = this.queryText.toLowerCase();
        let filteredOrders = [];

        _.forEach(this.ordersData, dat => {
            let orders = _.filter(dat.pedido, or => (<any>or).repartidor.toLowerCase()
            .includes(queryTextLower) || (<any>or).remitente.toLowerCase()
            .includes(queryTextLower) || (<any>or).idPaquete.toString().includes(queryTextLower));
            if (orders.length) {
                filteredOrders.push({codPos: dat.codPos, pedido: orders});
            }
        });

        /* LA SIGUIENTE LINEA NO FUNCIONA, PERO EL FILTRADO PREVIO SE REALIZA CORRECTAMENTE.
        *   Parece que no se asigna bien el filtrado del filteredOrders a la variable nAssignedOrders
        *   ¿Puede ser porque los datos tienen que introducirse a partir de un bucle 'for'?
        */
        
        this.nAssignedOrders = _.chain(filteredOrders)
                                .filter(o => o.estado === "En el almacén")
                                .groupBy('direccion')
                                .toPairs()
                                .map(item => _.zipObject(['dir', 'pedido'], item))
                                .value();

        console.log("aisg", this.nAssignedOrders);

        //this.nAssignedOrders = filteredOrders;
    }
 }