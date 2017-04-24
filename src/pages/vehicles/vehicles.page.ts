import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';
import moment from 'moment';

import {  } from '../pages';

@Component ({
     templateUrl: 'vehicles.page.html',
 })

 export class VehiclesPage {

    vehicles = [];
    private allVehicles: any;

    vehiclesDatabase: FirebaseListObservable<any>;

     constructor(public nav: NavController,
                 public loadingController: LoadingController,
                 public angularFire: AngularFire,
                 public toastController: ToastController){

        this.vehiclesDatabase = angularFire.database.list('/coches');

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

    newRevision(car){
        //console.log('test', car.ultimaRevision);

        this.vehiclesDatabase.update(car.$key, {ultimaRevision: moment().format()});

        let toast = this.toastController.create({
            message: "Se ha actualizado la fecha de la última revisión del coche " + car.matricula,
            duration: 4000,
            position: 'bottom'
        });

    }

}