import { Component } from '@angular/core';

/**
 * Generated class for the CuentasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cuentas',
  templateUrl: 'cuentas.html'
})
export class CuentasComponent {

  text: string;

  constructor() {
    console.log('Hello CuentasComponent Component');
    this.text = 'Hello World';
  }

}
