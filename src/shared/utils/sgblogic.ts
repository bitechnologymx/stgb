import { Injectable } from "@angular/core";
import { AppGlobals } from "../../services/globals";

@Injectable()
export class SgbLogic {

    private codigo = {
        cuentas : 27,
        tarjetas : 28,
        prestamos : 29,
        transferencias : 30,
        pagos : 31
    }

	private subOpcionPago = {
        tarjetas  : false,
        prestamos : false,
        servicios : false,
    }

    private codigoPago = {
        tarjetas  : 35,
        prestamos : 36,
        servicios : 37,
    }

    constructor(private globVars: AppGlobals) {}


    public opcionesOnOff(){

        console.log(".....................................");
        console.log(".....................................");
        console.log(" --NC " + this.globVars.tipoCuentas.numCuentas);

        this.globVars.opciones.cuentas = ( this.globVars.tipoCuentas.numCuentas >= 1 );

        console.log(" --OC " + this.globVars.opciones.cuentas);

        this.globVars.opciones.tarjetas = ( this.globVars.tipoCuentas.numTarjetas >= 1 );
        this.globVars.opciones.prestamos = ( this.globVars.tipoCuentas.numPrestamos >= 1 );
        this.globVars.opciones.transferencias = ( this.globVars.tipoCuentas.numCuentas >= 1 );
        this.globVars.opciones.pagos = (
            this.globVars.tipoCuentas.numCuentas >= 1 ||
            this.globVars.tipoCuentas.numTarjetas >= 1 ||
            this.globVars.tipoCuentas.numPrestamos >= 1
        );
        this.globVars.opciones.sucursales = true;
        this.globVars.opciones.ayuda = true;
        this.globVars.opciones.contacto = true;
        this.globVars.opciones.salida = true;

        this.globVars.opcionesCargadas = true;
    }

    public hayPermisoPara(opcion:string){

        console.log(".....................................");
        console.log(".....................................");
        console.log(" --HPP " + this.globVars.opciones[opcion]);

        return this.globVars.opciones[opcion];
      }

	public subOpcionesPagosOnOff(){
        // Si tiene cuentas y tiene tarjetas --> puede pagar tarjetas.
        this.subOpcionPago.tarjetas  = (this.globVars.opciones.cuentas && this.globVars.opciones.tarjetas);
        // Si tiene cuentas y tiene pr�stamos --> puede pagar pr�stamos.
        this.subOpcionPago.prestamos = (this.globVars.opciones.cuentas && this.globVars.opciones.prestamos);
        // Si tiene cuentas o tiene tarjetas con hub activo --> puede pagar servicios.
        this.subOpcionPago.servicios = (this.globVars.opciones.cuentas || (this.globVars.opciones.tarjetas && this.globVars.opciones.hubActivo));
    }

    public tipoPagoDefault() : string {
        if (this.globVars.opciones.cuentas && this.globVars.opciones.tarjetas && this.globVars.opciones.prestamos) return "Tarjetas";
        if (this.globVars.opciones.cuentas && this.globVars.opciones.tarjetas) return "Tarjetas";
        if (this.globVars.opciones.cuentas && this.globVars.opciones.prestamos) return "Prestamos";
        if (this.globVars.opciones.cuentas) return "Servicios";
        if (this.globVars.opciones.tarjetas && this.globVars.opciones.hubActivo) return "Servicios";
        return "";
      }

    public getCodigo(opcion:string) {
        return this.codigo[opcion];
    }

	public hayPermisoParaSubOpcionPago(subOpcion:string){
        return this.subOpcionPago[subOpcion.toLowerCase()];
    }

    public getCodigoPago(tipoPago:string) : string {
        return this.codigoPago[tipoPago.toLowerCase()];
    }

    public origenPago() {
        return "3";
    }

    public tipoOperacionPago(tipoPago) {
        let tiposDePago = ["Prestamos", "Tarjetas", "Servicios"];
        return tiposDePago.indexOf(tipoPago) + 2;
    }

    public tipoOperacionPagoValida(operaciones,tipoPago){
        for (let i=0; i<operaciones.length; i++) {
          let element = operaciones[i];
          if (element.codigo == "3" && tipoPago == "Tarjetas") return true;
          if (element.codigo == "2" && tipoPago == "Prestamos") return true;
          if (element.codigo == "4" && tipoPago == "Servicios") return true;
        }
        return false;
    }

}
