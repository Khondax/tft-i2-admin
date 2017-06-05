import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from "angularfire2";

import { DelivererHomePage } from '../pages';
import _ from 'lodash';

 @Component ({
     templateUrl: 'delivererLocation.page.html',
 })

 export class DelivererLocationPage {
     
     map: any = {};
     deliverer = [];
     delivererData: any;
     
     constructor(private nav: NavController,
                 public angularFire: AngularFire) { }
     
     ionViewDidLoad(){
         this.map = {
            lat: 27.942246703329612,
            lng: -15.598526000976562,
            zoom: 10
        };

        this.angularFire.database.list('/repartidores').subscribe(data => {
                this.delivererData = _.chain(data)
                                  .filter(o => o.coche != "" && o.horaCapturaGPS !="")
                                  .value();
                this.deliverer = this.delivererData;
            });
        
    }

    goToDeliverer($event, deliveryMan){
        this.nav.push(DelivererHomePage, deliveryMan);
    }

    getCorrectColor(deliveryMan){
        return deliveryMan.disponibilidad === "En ruta" ? '../../assets/marker-icons/marker_red.png' : '../../assets/marker-icons/marker_green.png';
    }

 }