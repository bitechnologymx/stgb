import { Component } from '@angular/core';

/**
 * Generated class for the PrestamosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'prestamos',
  templateUrl: 'prestamos.html'
})
export class PrestamosComponent {

  text: string;

  constructor() {
    console.log('Hello PrestamosComponent Component');
    this.text = 'Hello World';
  }

}
