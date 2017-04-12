import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

import { MapPage } from '../pages';

 @Component ({
     templateUrl: 'order.page.html',
 })

 export class OrderPage {

    order: any;

    constructor(private nav: NavController, private navParams: NavParams){
        this.order = this.navParams.data;
     }

    goToMap(){
    this.nav.push(MapPage, this.order);
    }

 }