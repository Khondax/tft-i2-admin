import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DelivererPage, DelivererPacksPage, DelivererPackFinishPage } from "../pages";

 @Component ({
     templateUrl: 'delivererHome.page.html'
 })

 export class DelivererHomePage {

    deliverer: any;
    delivererTab = DelivererPage;
    delivererPacksTab = DelivererPacksPage;
    delivererPackFinishTab = DelivererPackFinishPage;

    constructor(private nav: NavController,
                private navParams: NavParams){

        this.deliverer = this.navParams.data;

    }


 }