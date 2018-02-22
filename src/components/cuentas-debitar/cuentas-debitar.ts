import { Component } from '@angular/core';

/**
 * Generated class for the CuentasDebitarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cuentas-debitar',
  templateUrl: 'cuentas-debitar.html'
})
export class CuentasDebitarComponent {

  text: string;

  constructor() {
    console.log('Hello CuentasDebitarComponent Component');
    this.text = 'Hello World';
  }

}
