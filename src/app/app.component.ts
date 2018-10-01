import { Component, ViewChild } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LogUtils } from "../shared/utils/log-utils";
import { AppGlobals } from "../services/globals";
import { Encriptador } from "../shared/utils/encripta";
import { File } from '@ionic-native/file';

import { HomePage } from '../pages/home/home';
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

const PUBKEYPATH: string = "assets/public.txt";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  private encriptador: Encriptador;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public file: File, private globVars: AppGlobals, public http: HttpClient) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Contacto', component: ContactoPage},
      { title: 'Cuentas', component: CuentasPage},
      { title: 'Contacto', component: ContactoPage },
      { title: 'Cuentas', component: CuentasPage },
      { title: 'Login', component: LoginPage },
      { title: 'Principal', component: PrincipalPage },
      { title: 'Pagos', component: PagosPage },
      { title: 'Prestamos', component: PrestamosPage },
      { title: 'Recuperar Contraseña', component: PasswordPage },
      { title: 'Sucursales', component: SucursalesPage },
      { title: 'Tarjetas', component: TarjetasPage },
      { title: 'Transferencias', component: TransferenciasPage }

    ];

    this.encriptador = new Encriptador();

    this.leeLlavePublica();
  }

  private leeLlavePublica() {
    console.log("leeLlavePublica BEGIN", new Date().toLocaleTimeString());

    this.http.get(PUBKEYPATH, {responseType: 'text'}).subscribe( data =>
      {
        console.log(data);
        let xx = this.encriptador.base64ToPublicKey(data);
        this.globVars.wsPublicKey = xx;
      });

    console.log("leeLlavePublica END", new Date().toLocaleTimeString());

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
