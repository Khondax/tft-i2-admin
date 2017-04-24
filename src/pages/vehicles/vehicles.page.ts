import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import {  } from '../pages';

@Component ({
     templateUrl: 'vehicles.page.html',
 })

 export class VehiclesPage {

    vehicles = [];
    private allVehicles: any;

     constructor(public nav: NavController,
                 public loadingController: LoadingController,
                 public angularFire: AngularFire){


    }

    ionViewDidLoad(){
        let loader = this.loadingController.create({
            content: 'Cargando...',
            spinner: 'bubbles'
        });

        loader.present().then(() => {
            this.angularFire.database.list('/coches').subscribe(data =>{
                this.allVehicles = 
                    _.chain(data)
                    .orderBy('modelo')
                    .value();

                this.vehicles = this.allVehicles;
                loader.dismiss();
            });
        });


    }    
    
    getCorrectColor(car){
        return car.disponibilidad === "Ocupado" ? 'primary' : 'verde';
    }

}