import { Component } from '@angular/core';

/**
 * Generated class for the TarjetaResumenComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tarjeta-resumen',
  templateUrl: 'tarjeta-resumen.html'
})
export class TarjetaResumenComponent {

  text: string;

  constructor() {
    console.log('Hello TarjetaResumenComponent Component');
    this.text = 'Hello World';
  }

}
