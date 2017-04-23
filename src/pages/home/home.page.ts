import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { NewOrderPage, OrderPage } from '../pages';

 @Component ({
     templateUrl: 'home.page.html',
     selector: 'home.page.scss'
 })

 export class HomePage {

     orders: FirebaseListObservable<any>;
     orderFilter: string = "notAssigned"; 
    
    constructor(private loadingController: LoadingController,
                private nav: NavController,
                public angularFire: AngularFire){ 
                    
             this.orders = angularFire.database.list('/pedidos');      
    }

    newPackage(){
        this.nav.push(NewOrderPage);
    }

    goToOrder($event, order){
        this.nav.push(OrderPage, order);
    }


 }