import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import {  } from '../pages';

 @Component ({
     templateUrl: 'new-order.page.html',
 })

 export class NewOrderPage {

    results: any;

    constructor(private barcodeScanner: BarcodeScanner, private nav: NavController){ }

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
        this.nav.popToRoot();
    }

 }