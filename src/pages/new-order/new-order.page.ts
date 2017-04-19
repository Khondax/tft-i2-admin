import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { AngularFire, FirebaseListObservable } from "angularfire2";

import moment from 'moment';

import {  } from '../pages';

 @Component ({
     templateUrl: 'new-order.page.html',
 })

 export class NewOrderPage {

    results: any;
    string: any;
    order: FirebaseListObservable<any>;


    constructor(public barcodeScanner: BarcodeScanner,
                public nav: NavController,
                public angularFire: AngularFire,
                public alertController: AlertController,
                public toastController: ToastController){ 
                    
        this.order = angularFire.database.list('/pedidos');
    }

    scan(){
        this.barcodeScanner.scan().then((barcodeData) => {
            this.results = barcodeData;
        }, (err) => {
            alert(`Error al escanear: ${err}`);
        });
    }

    reset(){
        this.results = null;
    }

    save(){

        //TODO: Añadir un nuevo paquete
        
        this.string = this.results.text.split("#");

        let prompt = this.alertController.create({
            title: 'Crear',
            message: "¿Quieres crear este paquete?",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancelado');
                    }
                },
                {
                    text: 'Si',
                    handler: data =>{
                                                
                        this.order.push({
                            codigoPostal: this.string[0],
                            destinatario: this.string[1],
                            dimensiones: this.string[2],
                            direccion: this.string[3],
                            dni: this.string[4],
                            estado: "En el almacén",
                            fechaEntradaAlmacen: moment().format(),
                            fechaEntrega: "",
                            latitud: this.string[5],
                            longitud: this.string[6],
                            numPaquetes: this.string[7],
                            peso: this.string[8],
                            remitente: this.string[9],
                            repartidor: "",
                            telf: this.string[10],
                            urgente: ""
                        });

  
                        this.nav.popToRoot();

                        let toast = this.toastController.create({
                            message: "Se ha creado el paquete",
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