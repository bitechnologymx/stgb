import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { HttpUtils } from "../shared/utils/http-utils";

import { Tarjeta } from "../services/interfaces/tarjetas.interface";
import { MovtoCorriente, MovtoFlotante, MovtoResumen } from "./interfaces/tarjeta-movtos.interface";

@Injectable()
export class TarjetasService {
 
  private baseUrl : string = HttpUtils.getWsUrl();


  constructor(private http : HttpClient) { 
  }

  obtenerTarjetas(encryptedSecuencia) {
    let url : string = `${this.baseUrl}/GET_TC`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    //console.log(url, "-", formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      //console.log("obtenerTarjetas", JSON.stringify(res));
      let tarjetas : Tarjeta[] = this.transformaTarjetas(res);
      return tarjetas;
    });
  }

  private transformaTarjetas(res:Object):Tarjeta[]{
    let tarjetas = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      // La respuesta es un array (Varias tarjetas).
      arr.forEach( (objeto) => {
        tarjetas.push(this.creaTarjeta(objeto));
      });
    } else {
      // La respuesta es un objeto (una sola tarjeta).
      tarjetas.push(this.creaTarjeta(arr));
    }
    return tarjetas;
  }

  private creaTarjeta(objeto : Object) : Tarjeta {
    let tarjeta:Tarjeta = new Tarjeta();
    tarjeta.numTarjeta      = objeto["NUM_TARJETA"];
    tarjeta.pseudonimo      = objeto["PSEUDONIMO"];
    tarjeta.producto        = objeto["PRODUCTO"];
    tarjeta.saldo           = objeto["SALDO"];
    tarjeta.disponible      = objeto["DISPONIBLE"];
    tarjeta.tipoTC          = objeto["TIPO_TC"];
    tarjeta.numCuenta       = objeto["NUM_CTA_CREDITO"];
    //console.log(tarjeta.numTarjeta); 
    return tarjeta;
  }


  obtenerMovtosTarjeta(encryptedSecuencia, encryptedNumCta, numTarjeta:string, tipoMovtos:string) {
    let servicio: string = (tipoMovtos=="Corrientes") ? "GET_TC_MOV" : (tipoMovtos=="Flotantes") ? "GET_TC_HOLD" : "GET_TC_HEADER";
    let url : string = `${this.baseUrl}/${servicio}`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PNUM_CTA_CREDITO', encryptedNumCta);
    //formData.append((tipoMovtos=="Flotantes")?'PTARJETA':'PNUM_TC', numTarjeta);
    formData.append('PNUM_TC', numTarjeta);
    console.log(url+"\n"+encryptedSecuencia, encryptedNumCta, numTarjeta);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("obtenerMovtosTarjeta", JSON.stringify(res));
      let movtos : any[];
      if (tipoMovtos=="Corrientes") {
        movtos = this.transformaMovtosCorrientes(res);
      } else if (tipoMovtos=="Flotantes") {
        movtos = this.transformaMovtosFlotantes(res);
      } else {
        movtos = this.transformaMovtosResumen(res);
      }
      return movtos;
    });
  }

  private transformaMovtosCorrientes(res:Object) : MovtoCorriente[] {
    let movtos = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any> = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {  // La respuesta es un array (Varios movimientos).
        obj.forEach( (element) => {
          movtos.push(this.creaMovtoCorriente(element));
        });
      } else { // Es un solo movto.
        movtos.push(this.creaMovtoCorriente(obj));
      }
    }
    return movtos;
  }

  private creaMovtoCorriente(objeto){
    let movto: MovtoCorriente = new MovtoCorriente();
    movto.fechaMov    = objeto["XFEC_COMPRA"];
    movto.fechaPosteo = objeto["XFEC_POSTEO"]
    movto.descripcion = objeto["XDESC_MOV"];
    movto.monto       = objeto["XMON_MOV"];
    movto.referencia  = objeto["XREF_INTER"];
    movto.tc          = objeto["XTC"];
    return movto;
  }

  private transformaMovtosFlotantes(res:Object) : MovtoFlotante[] {
    let movtos = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any> = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {  // La respuesta es un array (Varios movimientos).
        obj.forEach( (element) => {
          movtos.push(this.creaMovtoFlotante(element));
        });
      } else { // Es un solo movto.
        movtos.push(this.creaMovtoFlotante(obj));
      }
    }
    return movtos;
  }

  private creaMovtoFlotante(objeto){
    let movto: MovtoFlotante = new MovtoFlotante();
    movto.fechaMov    = objeto["FECHA"];
    movto.descripcion = objeto["DESCRIPCION"];
    movto.monto       = objeto["MONTO"];
    movto.tc          = objeto["TARJETA"];
    return movto;
  }

  private transformaMovtosResumen(res:Object) : MovtoResumen[] {
    let movtos = [];
    // En este caso, se espera un objeto.
    let objeto:Object = res["NewDataSet"]["Table"];
    let movto : MovtoResumen = new MovtoResumen();
    movto.nombre              = objeto["NOMBRE"];
    movto.fechaCorte          = objeto["FECHA_CORTE"];
    movto.numCuenta           = objeto["NUM_CUENTA"];
    movto.fechaPagoContado    = objeto["FECHA_PAGO_CONTADO"];
    movto.pagoContado         = objeto["PAGO_CONTADO"];
    movto.status              = objeto["ESTADO"];
    movto.fechaPagoMinimo     = objeto["FECHA_PAGO_MINIMO"];
    movto.tipoTarjeta         = objeto["TIPO_TARJETA"];
    movto.balanceAnterior     = objeto["BALANCE_ANTERIOR"];
    movto.fechaVencimiento    = objeto["FECHA_VENCIMIENTO"];
    movto.comprasRetiros      = objeto["CONSUMOS_COMP_RET"];
    movto.cargosVarios        = objeto["CARGOS_VARIOS"];
    movto.cargosFinancieros   = objeto["CARGOS_X_FINAN"];
    movto.limiteCredito       = objeto["LIMITE_CREDITO"];
    movto.pagosCreditos       = objeto["PAGOS_CREDITOS"];
    movto.saldoActual         = objeto["SALDO_ACTUAL"];
    movto.saldoAlCorte        = objeto["SALDO_CORTE"];
    movto.flotes              = objeto["FLOTES"];
    movto.pagoMinimo          = objeto["PAGO_MINIMO"];
    movto.creditoDisponible   = objeto["CREDITO_DISPONIBLE"];
    movto.puntosPromerica     = objeto["PUNTOS_PROMERICA"];
    movto.sobregiro           = objeto["SOBREGIRO"];
    movto.financiamiento      = objeto["FINANCIAMIENTO"];
    movto.numTjtasAdicionales = objeto["NUM_TARJETAS_ADICIONALES"];
    movtos.push(movto);
    //console.log("FechaPagoConatdo:",objeto["FECHA_PAGO_CONTADO"]);
    return movtos;
  } 
  
  
}