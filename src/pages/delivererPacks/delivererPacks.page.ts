import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {  } from "../pages";

 @Component ({
     templateUrl: 'delivererPacks.page.html'
 })

export class DelivererPacksPage {

    deliverer: any = {};

    constructor (private nav: NavController,
                 private navParams: NavParams){
                this.deliverer = this.navParams.data;
    }

    ionDidEnter(){
        
    }

 }