import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { ContactoPage } from '../pages/contacto/contacto';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { LoginPage } from '../pages/login/login';
import { PrincipalPage } from '../pages/principal/principal';
import { PagosPage } from '../pages/pagos/pagos';
import { PrestamosPage } from '../pages/prestamos/prestamos';
import { PasswordPage } from '../pages/password/password';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { TarjetasPage } from '../pages/tarjetas/tarjetas';
import { TransferenciasPage } from '../pages/transferencias/transferencias';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ContactoPage,
    CuentasPage,
    LoginPage,
    PrincipalPage,
    PagosPage,
    PrestamosPage,
    PasswordPage,
    SucursalesPage,
    TarjetasPage,
    TransferenciasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ContactoPage,
    CuentasPage,
    LoginPage,
    PrincipalPage,
    PagosPage,
    PrestamosPage,
    PasswordPage,
    SucursalesPage,
    TarjetasPage,
    TransferenciasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
