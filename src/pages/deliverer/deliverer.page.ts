import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import _ from 'lodash';

import {  } from '../pages';

 @Component ({
     templateUrl: 'delivery-men.page.html',
 })

 export class DelivererPage {

    
    constructor(public nav: NavController,
                public loadingController: LoadingController,
                public toastController: ToastController,
                public angularFire: AngularFire,
                public alertController: AlertController,){

    }

    ionViewDidLoad(){
        
    }


    getCorrectColor(deliveryMan){
        
    }


    addCar($event, deliveryMan){
        
    }


    removeCar($event, deliveryMan){

    }



 }