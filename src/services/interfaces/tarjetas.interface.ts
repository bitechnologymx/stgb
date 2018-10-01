import { MovtoCorriente, MovtoFlotante, MovtoResumen } from "./tarjeta-movtos.interface";

 export class Tarjeta {
    numTarjeta : string;
    pseudonimo : string;
    producto: string;
    saldo : string;
    disponible: string;
    tipoTC: string;
    numCuenta: string;
    movtosCorrientes : MovtoCorriente[];
    movtosFlotantes: MovtoFlotante[];
    movtosResumen: MovtoResumen[];
}