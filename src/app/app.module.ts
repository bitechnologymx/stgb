import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactoPage } from '../pages/contacto/contacto';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { LoginPage } from '../pages/login/login';
import { PrincipalPage } from '../pages/principal/principal';
import { PagosPage } from '../pages/pagos/pagos';
import { PrestamosPage } from '../pages/prestamos/prestamos';
import { RecuperarContraseñaPage } from '../pages/recuperar-contraseña/recuperar-contraseña';
import { PasswordPage } from '../pages/password/password';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { TarjetasPage } from '../pages/tarjetas/tarjetas';
import { TransferenciasPage } from '../pages/transferencias/transferencias';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppGlobals } from "../services/globals";
import { File } from '@ionic-native/file';

import { BankService } from "../services/bank.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ContactoPage,
    CuentasPage,
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
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ContactoPage,
    CuentasPage,
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
    File,
    AppGlobals,
    SecureStorage,
    BankService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
