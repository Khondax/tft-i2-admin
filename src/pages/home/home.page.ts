import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { NewOrderPage, OrderPage } from '../pages';

 @Component ({
     templateUrl: 'home.page.html',
     selector: 'home.page.scss'
 })

 export class HomePage {

    orders = [{
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

    constructor(private loadingController: LoadingController,
                private nav: NavController){ }

    newPackage(){
        this.nav.push(NewOrderPage);
    }

    goToOrder($event, order){
        this.nav.push(OrderPage, order.pack);
    }

 }