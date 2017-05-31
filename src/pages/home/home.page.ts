import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import { AngularFire } from "angularfire2";

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
     nAssignedOrdersData: any;
     assignedOrders = [];

     ordersError = [];
     orderFilter: string = "notAssigned";
     queryText: string = "";
     queryTextAssigned: string = "";

     allOrders= [];

     map: any = {};

    constructor(private loadingController: LoadingController,
                private nav: NavController,
                public angularFire: AngularFire,
                public menuController: MenuController){ 

        this.menuController.enable(true);
                        
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
                                  .filter(o => o.estado === "En el almacén")
                                  .groupBy('codigoPostal')
                                  .toPairs()
                                  .map(item => _.zipObject(['codPos', 'pedido'], item))
                                  .value();

                this.nAssignedOrdersData =_.chain(this.ordersData)
                                       .orderBy('direccion')
                                       .value();

                this.nAssignedOrders = this.nAssignedOrdersData;

                this.allOrders = _.chain(data)
                                  .filter(o => o.estado != "Incidencia registrada")
                                  .value();

                this.ordersError = _.chain(data)
                                    .filter(o => o.estado === "Incidencia registrada")
                                    .value();

                this.assignedOrdersData = _.chain(data)
                                          .filter(o => o.estado === "Asignado")
                                          .groupBy('repartidor')
                                          .toPairs()
                                          .map(item => _.zipObject(['repart', 'pedido'], item))
                                          .value();

                this.assignedOrders = this.assignedOrdersData;


                loader.dismiss();
            });

             this.map = {
                    lat: 27.942246703329612,
                    lng: -15.598526000976562,
                    zoom: 9
            };
        });
    }

    search(){
        let queryTextLower = this.queryText.toLowerCase();
        let filteredOrders = [];

        _.forEach(this.nAssignedOrdersData, dat => {
            let orders = _.filter(dat.pedido, or => (<any>or).direccion.toLowerCase()
            .includes(queryTextLower) || (<any>or).remitente.toLowerCase()
            .includes(queryTextLower) || (<any>or).idPaquete.toString().includes(queryTextLower));
            if (orders.length) {
                filteredOrders.push({codPos: dat.codPos, pedido: orders});
            }
        });
        
        this.nAssignedOrders = filteredOrders;
    }

    assignedSearch(){
        let queryTextLower = this.queryTextAssigned.toLowerCase();
        let filteredOrders = [];

        _.forEach(this.assignedOrdersData, dat => {
            let orders = _.filter(dat.pedido, or => (<any>or).direccion.toLowerCase()
            .includes(queryTextLower) || (<any>or).remitente.toLowerCase()
            .includes(queryTextLower) || (<any>or).idPaquete.toString().includes(queryTextLower));
            if (orders.length) {
                filteredOrders.push({repart: dat.repart, pedido: orders});
            }
        });
        
        this.assignedOrders = filteredOrders;
    }

    getCorrectColor(order){
        switch (order.estado) {
            case "En el almacén":
                return 'https://github.com/Concept211/Google-Maps-Markers/blob/master/images/marker_orange.png?raw=true';
            case "Entregado":
                return 'https://github.com/Concept211/Google-Maps-Markers/blob/master/images/marker_blue.png?raw=true';
            case "Asignado":
                return 'https://github.com/Concept211/Google-Maps-Markers/blob/master/images/marker_purple.png?raw=true';
            case "En reparto":
                return 'https://github.com/Concept211/Google-Maps-Markers/blob/master/images/marker_white.png?raw=true';
            case "Siguiente en entrega":
                return 'https://github.com/Concept211/Google-Maps-Markers/blob/master/images/marker_green.png?raw=true';
        }
    }
 }