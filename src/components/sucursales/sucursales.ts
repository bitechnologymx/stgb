import { Component } from '@angular/core';

/**
 * Generated class for the SucursalesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sucursales',
  templateUrl: 'sucursales.html'
})
export class SucursalesComponent {

  text: string;

  constructor() {
    console.log('Hello SucursalesComponent Component');
    this.text = 'Hello World';
  }

}
