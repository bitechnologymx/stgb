import { Component } from '@angular/core';

/**
 * Generated class for the FavoritosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'favoritos',
  templateUrl: 'favoritos.html'
})
export class FavoritosComponent {

  text: string;

  constructor() {
    console.log('Hello FavoritosComponent Component');
    this.text = 'Hello World';
  }

}
