import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import {  } from '../pages';

 @Component ({
     templateUrl: 'registry.page.html'
 })

 export class RegistryPage {

    orders: FirebaseListObservable<any>;

/*    orders = [{
        pack: { id: '123',
        dni: '44734470E',
        destino: 'Mike',
        direccion: 'Calle Falsa 123',
        lat: 39.248958,
        long: -76.822041,
        estado: '',
        empresa: 'Ebay',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        fechaEntrega: '',
        numPaquetes: '2',
        peso: '3kg, 1.2kg',
        dimensiones: '20x20cm, 150x65cm',
        telf: '666123456'  },
        },

       { pack: { id: '123a',
        dni: '44745670E',
        destino: 'Jimmy',
        direccion: 'Avenida Nucelar 1',
        estado: '',
        empresa: 'Modas Cristal',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        fechaEntrega: '',
        numPaquetes: '4',
        peso: '3kg, 1.2kg, 0.4kg, 5.4kg',
        dimensiones: '20x20cm, 150x65cm, 15x10cm, 460x780cm ',
        telf: '666123465'  },
       },

       { pack: { id: '123b',
        dni: '48524470E',
        destino: 'Johny',
        direccion: 'Pasaje de Escocia',
        estado: '',
        empresa: 'PC Componentes',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        fechaEntrega: '',
        numPaquetes: '1',
        peso: '3kg',
        dimensiones: '150x150cm',
        telf: '666123456'  },
       },

        { pack: { id: '123c',
        dni: '42247240C',
        destino: 'Maria',
        direccion: 'Calle Falsa 123',
        estado: '',
        empresa: 'PC Componentes',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        fechaEntrega: '2017-11-15T09:42:00',
        numPaquetes: '2',
        peso: '3kg, 1.2kg',
        dimensiones: '20x20cm, 150x65cm',
        telf: '666123456'  },
        },

        { pack: { id: '123d',
        dni: '44734470E',
        destino: 'Mike',
        direccion: 'Calle Falsa 123',
        estado: '',
        empresa: 'Amazon',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        fechaEntrega: '2017-11-17T10:00:00',
        numPaquetes: '2',
        peso: '3kg, 1.2kg',
        dimensiones: '20x20cm, 150x65cm',
        telf: '666123456'  },
        },

        { pack: { id: '123e',
        dni: '44734470E',
        destino: 'Mike',
        direccion: 'Calle Falsa 123',
        estado: '',
        empresa: 'El Corte Inglés',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        fechaEntrega: '2017-11-16T09:00:00',
        numPaquetes: '2',
        peso: '3kg, 1.2kg',
        dimensiones: '20x20cm, 150x65cm',
        telf: '666123456'  },
        }
    ];
*/


    constructor(public nav: NavController,
                public alertController: AlertController,
                public angularFire: AngularFire){

        this.orders = angularFire.database.list('/pedidos');

    }

    add(){
        let prompt = this.alertController.create({
            title: 'Nuevo paquete',
            message: "Escribe los datos del paquete",
            inputs: [
                {
                    name: 'destinatario',
                    placeholder: 'Destinatario'
                },
                {
                    name: 'dimensiones',
                    placeholder: 'Dimensiones'
                },
                {
                    name: 'direccion',
                    placeholder: 'Dirección'
                },
                {
                    name: 'dni',
                    placeholder: 'DNI'
                },
                {
                    name: 'lat',
                    placeholder: 'Latitud'
                },
                {
                    name: 'long',
                    placeholder: 'Longitud'
                },
                {
                    name: 'numPaquetes',
                    placeholder: 'Número de paquetes'
                },
                {
                    name: 'peso',
                    placeholder: 'Peso'
                },
                {
                    name: 'remitente',
                    placeholder: 'Remitente'
                },
                {
                    name: 'telf',
                    placeholder: 'Teléfono'
                },
                {
                    name: 'urgente',
                    placeholder: 'Urgente'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancelado');
                    }
                },
                {
                    text: 'Guardar',
                    handler: data =>{
                        this.orders.push({
                            destinatario: data.destinatario,
                            dimensiones: data.dimensiones,
                            direccion: data.direccion,
                            dni: data.dni,
                            estado: "",
                            fechaEntradaAlmacen: '2017-11-20T08:00:00',
                            fechaEntrega: "",
                            id: 1,
                            latitud: data.lat,
                            longitud: data.long,
                            numPaquetes: data.numPaquetes,
                            peso: data.peso,
                            remitente: data.remitente,
                            repartidor: "",
                            telf: data.telf,
                            urgente: data.urgente
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

 }