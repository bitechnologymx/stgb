import { Component } from '@angular/core';

/**
 * Generated class for the TarjetasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tarjetas',
  templateUrl: 'tarjetas.html'
})
export class TarjetasComponent {

  text: string;

  constructor() {
    console.log('Hello TarjetasComponent Component');
    this.text = 'Hello World';
  }

}
