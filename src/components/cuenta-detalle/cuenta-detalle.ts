import { Component } from '@angular/core';

/**
 * Generated class for the CuentaDetalleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cuenta-detalle',
  templateUrl: 'cuenta-detalle.html'
})
export class CuentaDetalleComponent {

  text: string;

  constructor() {
    console.log('Hello CuentaDetalleComponent Component');
    this.text = 'Hello World';
  }

}
