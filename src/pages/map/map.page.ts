import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { OrderPage } from '../pages'; 

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from "@ionic-native/google-maps";


declare var window: any;

@Component({
  templateUrl: 'map.page.html'
})
export class MapPage {

//  map: any = {};
  order: any;

  constructor(private navParams: NavParams, private googleMaps: GoogleMaps) {
    this.order = this.navParams.data;
  }

  ngAfterViewInit(){
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    let direccion: LatLng = new LatLng(this.order.lat, this.order.long);

    let position: CameraPosition = {
      target: direccion,
      zoom: 13,
      tilt: 30
    };

    map.moveCamera(position);

    let markerOptions: MarkerOptions = {
      position: direccion,
      title: this.order.direccion
    };

/*    const marker: Marker = map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
    });*/


  }

}
