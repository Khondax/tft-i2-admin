import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { OrderPage } from '../pages'; 

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from "@ionic-native/google-maps";

@Component({
  templateUrl: 'map.page.html',
  selector: 'map.page.scss'
})

export class MapPage {

  order: any;

  constructor(private navParams: NavParams, private googleMaps: GoogleMaps) {
    this.order = this.navParams.data;
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    let direccion: LatLng = new LatLng(43.0741904,-89.3809802);

    let position: CameraPosition = {
      target: direccion,
      zoom: 18,
      tilt: 30
    };

    map.moveCamera(position);

    let markerOptions: MarkerOptions = {
      position: direccion,
      title: this.order.direccion
    };

    /*const marker: Marker = map.addMarker(markerOptions)
   .then((marker: Marker) => {
      marker.showInfoWindow();
    });*/


  }

}
