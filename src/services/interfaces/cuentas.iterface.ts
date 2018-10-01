import { MovtoCuenta } from "./cuenta-movtos.interface";

 export class Cuenta {
    numCuenta   : string;
    numTarjeta  : string;
    pseudonimo  : string;
    moneda      : string;
    status      : string;
    saldoActual : string;
    saldoTotal  : string;
    titular     : string;
    movimientos : MovtoCuenta[];
}