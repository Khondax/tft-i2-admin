import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import {  } from '../pages';

 @Component ({
     templateUrl: 'home.page.html',
     selector: 'home.page.scss'
 })

 export class HomePage {

    packs = [
      { id: '123', desc: 'paquete1' },
      { id: '123a', desc: 'paquete2' },
      { id: '123b', desc: 'paquete3' },
      { id: '123c', desc: 'paquete4' },
      { id: '123d', desc: 'paquete5' },
      { id: '123e', desc: 'paquete6' },
    ];

    constructor(){ }


 }