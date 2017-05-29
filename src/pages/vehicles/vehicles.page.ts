import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

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
                 public alertController: AlertController,
                 public toastController: ToastController){

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
                this.vehiclesDatabase = this.angularFire.database.list('/coches');
                loader.dismiss();
            });
        });
    }    
    
    getCorrectColor(car){
        return car.disponibilidad === "Ocupado" ? 'primary' : 'verde';
    }

    newRevision(car){

        let prompt = this.alertController.create({
            title: 'Fecha de última revisión',
            message: "¿Quieres actualizar la fecha de la última revisión de este vehículo?",
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Si',
                    handler: data =>{
                        this.vehiclesDatabase.update(car.$key, {ultimaRevision: moment().format()});

                        let toast = this.toastController.create({
                            message: "Se ha actualizado la fecha de la última revisión del vehículo " + car.matricula,
                            duration: 4000,
                            position: 'bottom'
                        });
                        
                        toast.present();
                    }
                }
            ]
        });
        prompt.present();
    }

}