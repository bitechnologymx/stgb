import { Component } from '@angular/core';

/**
 * Generated class for the TarjetaDetalleFlotantesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tarjeta-detalle-flotantes',
  templateUrl: 'tarjeta-detalle-flotantes.html'
})
export class TarjetaDetalleFlotantesComponent {

  text: string;

  constructor() {
    console.log('Hello TarjetaDetalleFlotantesComponent Component');
    this.text = 'Hello World';
  }

}
