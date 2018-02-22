import { NgModule } from '@angular/core';
import { CuentasComponent } from './cuentas/cuentas';
import { CuentaDetalleComponent } from './cuenta-detalle/cuenta-detalle';
import { PrestamosComponent } from './prestamos/prestamos';
import { TarjetasComponent } from './tarjetas/tarjetas';
import { TarjetaDetalleCorrientesComponent } from './tarjeta-detalle-corrientes/tarjeta-detalle-corrientes';
import { TarjetaDetalleFlotantesComponent } from './tarjeta-detalle-flotantes/tarjeta-detalle-flotantes';
import { TarjetaResumenComponent } from './tarjeta-resumen/tarjeta-resumen';
import { SucursalesComponent } from './sucursales/sucursales';
import { CuentasDebitarComponent } from './cuentas-debitar/cuentas-debitar';
import { FavoritosComponent } from './favoritos/favoritos';
@NgModule({
	declarations: [CuentasComponent,
    CuentaDetalleComponent,
    PrestamosComponent,
    TarjetasComponent,
    TarjetaDetalleCorrientesComponent,
    TarjetaDetalleFlotantesComponent,
    TarjetaResumenComponent,
    SucursalesComponent,
    CuentasDebitarComponent,
    FavoritosComponent],
	imports: [],
	exports: [CuentasComponent,
    CuentaDetalleComponent,
    PrestamosComponent,
    TarjetasComponent,
    TarjetaDetalleCorrientesComponent,
    TarjetaDetalleFlotantesComponent,
    TarjetaResumenComponent,
    SucursalesComponent,
    CuentasDebitarComponent,
    FavoritosComponent]
})
export class ComponentsModule {}
