import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'map.page.html',
  selector: 'map.page.scss'
})

export class MapPage {

  map: any = {};

  constructor(private navParams: NavParams) { }


  ionViewDidLoad(){
    let order = this.navParams.data;
    
    this.map = {
      lat: order.latitud,
      lng: order.longitud,
      zoom: 15,
      markerLabel: order.direccion
    };

  }



}
