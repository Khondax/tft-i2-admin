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
        estado: '',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        numPaquetes: '2',
        telf: '666123456'  },
        },

       { pack: { id: '123a',
        dni: '44745670E',
        destino: 'Jimmy',
        direccion: 'Avenida Nucelar 1',
        estado: '',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        numPaquetes: '4',
        telf: '666123465'  },
       },

       { pack: { id: '123b',
        dni: '48524470E',
        destino: 'Johny',
        direccion: 'Pasaje de Escocia',
        estado: '',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        numPaquetes: '1',
        telf: '666123456'  },
       },

        { pack: { id: '123c',
        dni: '42247240C',
        destino: 'Maria',
        direccion: 'Calle Falsa 123',
        estado: '',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        numPaquetes: '2',
        telf: '666123456'  },
        },

        { pack: { id: '123d',
        dni: '44734470E',
        destino: 'Mike',
        direccion: 'Calle Falsa 123',
        estado: '',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        numPaquetes: '2',
        telf: '666123456'  },
        },

        { pack: { id: '123e',
        dni: '44734470E',
        destino: 'Mike',
        direccion: 'Calle Falsa 123',
        estado: '',
        fechaEntradaAlmacen: '2017-11-16T08:00:00',
        numPaquetes: '2',
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