import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferenciasPage } from './transferencias';

@NgModule({
  declarations: [
    TransferenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferenciasPage),
  ],
})
export class TransferenciasPageModule {}
