import { Component } from '@angular/core';

/**
 * Generated class for the TarjetaDetalleCorrientesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tarjeta-detalle-corrientes',
  templateUrl: 'tarjeta-detalle-corrientes.html'
})
export class TarjetaDetalleCorrientesComponent {

  text: string;

  constructor() {
    console.log('Hello TarjetaDetalleCorrientesComponent Component');
    this.text = 'Hello World';
  }

}
