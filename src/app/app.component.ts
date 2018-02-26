import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactoPage } from '../pages/contacto/contacto';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { LoginPage } from '../pages/login/login';
import { PrincipalPage } from '../pages/principal/principal';
import { PagosPage } from '../pages/pagos/pagos';
import { PrestamosPage } from '../pages/prestamos/prestamos';
import { RecuperarContraseñaPage } from '../pages/recuperar-contraseña/recuperar-contraseña';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { TarjetasPage } from '../pages/tarjetas/tarjetas';
import { TransferenciasPage } from '../pages/transferencias/transferencias';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Contacto', component: ContactoPage},
      { title: 'Cuentas', component: CuentasPage},
      { title: 'List', component: ListPage },
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

>>>>>>> master
    ];

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
