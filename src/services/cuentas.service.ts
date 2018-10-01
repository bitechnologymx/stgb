import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { HttpUtils } from "../shared/utils/http-utils";

import { Cuenta } from "../services/interfaces/cuentas.iterface";
import { MovtoCuenta } from "../services/interfaces/cuenta-movtos.interface";
import { WsRespuesta } from "../services/interfaces/respuesta.interface";

export class WsData {
  mensaje : WsRespuesta;
  movimientos : MovtoCuenta[];
}

@Injectable()
export class CuentasService {
 
  private baseUrl : string = HttpUtils.getWsUrl();


  constructor(private http : HttpClient) { 
  }

  obtenerCuentas(encryptedSecuencia) {
    let url : string = `${this.baseUrl}/GET_CC`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("obtenerCuentas", JSON.stringify(res));
      let cuentas : Cuenta[] = this.transformaCuentas(res);
      return cuentas;
    });
  }

  private transformaCuentas(res:Object):Cuenta[]{
    let cuentas = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      // La respuesta es un array (Varias cuentas).
      arr.forEach( (objeto) => {
        cuentas.push(this.creaCuenta(objeto));
      });
    } else {
      // La respuesta es un objeto (una sola cuenta).
      cuentas.push(this.creaCuenta(arr));
    }
    return cuentas;
  }

  private creaCuenta(objeto : Object) : Cuenta {
    let cuenta:Cuenta = new Cuenta();
    cuenta.numTarjeta      = objeto["NUM_TARJETA"];
    cuenta.numCuenta       = objeto["NUM_CUENTA"];
    cuenta.titular         = objeto["TITULAR"];
    cuenta.status          = objeto["ESTADO_CTA"];
    cuenta.moneda          = objeto["VMONEDA"];
    cuenta.saldoActual     = objeto["SALDO_ACTUAL"];
    cuenta.pseudonimo      = objeto["PSEUDONIMO"];
    cuenta.saldoTotal      = objeto["SAL_TOTAL_CTA"];
    return cuenta;
  }


  obtenerMovtosCuenta(encryptedSecuencia: any, encryptedCuenta: any, min: number, max: number){
    let url : string = `${this.baseUrl}/GET_CC_MOV`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PNUM_CUENTA', encryptedCuenta);
    formData.append('PCANT_MIN', min.toString());
    formData.append('PCANT_MAX', max.toString());
    console.log(url, "\n", encryptedSecuencia, encryptedCuenta, min, max);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("obtenerMovtosCuenta", JSON.stringify(res));
      let wsData : WsData = this.transformMovtosCuenta(res);
      return wsData;
    });
  }

  private transformMovtosCuenta(res:Object) : WsData {
    let wsData : WsData = new WsData();
    let movtos = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any>  = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {
        // La respuesta es un array (Varios movimientos).
        obj.forEach( (element) => {
          movtos.push(this.creaMovto(element));
        });
      } else {
        // La respuesta es un objeto (puede ser un movto o un mensaje, hazme el favor!!!??).
        if (obj["PRESP_COD"]) {
          // Es un mensaje
          wsData.mensaje = this.creaRespuesta(obj);
        } else {
          // Es un solo movto.
          movtos.push(this.creaMovto(obj));
        }
      }
    }
    wsData.movimientos = movtos;
    return wsData;
  }

  private creaMovto(objeto : Object) : MovtoCuenta {
    let movto:MovtoCuenta = new MovtoCuenta();
    movto.fecha       = objeto["FEC_MOVIMIENTO"];
    movto.descripcion = objeto["DESCRIPCION"];
    movto.monto       = objeto["MON_MOVIMIENTO"];
    movto.saldo       = objeto["VSALDO"];
    return movto;
  }

  private creaRespuesta(objeto:Object) : WsRespuesta {
    let respuesta : WsRespuesta = new WsRespuesta();
    respuesta.codigo  = objeto["PRESP_COD"];
    respuesta.mensaje = objeto["PMENSAJE"];
    return respuesta;
  }

}