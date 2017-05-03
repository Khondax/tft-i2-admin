import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { } from '../pages';

 @Component ({
     templateUrl: 'delivererPackFinish.page.html'
 })

export class DelivererPackFinishPage {

    deliverer: any = {};

    constructor (private nav: NavController,
                 private navParams: NavParams){
        
        
    }

    ionDidEnter(){
        this.deliverer = this.navParams.data;
    }

}