import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { Prestamo } from "../services/interfaces/prestamo.iterface";
import { HttpUtils } from "../shared/utils/http-utils";

@Injectable()
export class PrestamoService {
 
  private baseUrl : string = HttpUtils.getWsUrl();

  constructor(private http : HttpClient) { 
  }

  obtenerPrestamos(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_PR`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    //console.log(url, "-", formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      //console.log("obtenerPrestamos", JSON.stringify(res)); 
      let prestamos : Prestamo[] = this.transformaRespuesta(res);
      return prestamos;
    });
  }

  private transformaRespuesta(res:Object) : Prestamo[] {
    let prestamos = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      // La respuesta es un array (Varios préstamos).
      arr.forEach( (objeto) => {
        prestamos.push(this.creaPrestamo(objeto));
      });
    } else {
      // La respuesta es un objeto (un solo préstamo).
      prestamos.push(this.creaPrestamo(arr));
    }
    return prestamos;
  }

  private creaPrestamo(objeto : Object) : Prestamo {
    let prestamo : Prestamo    = new Prestamo();
    prestamo.numCredito        = objeto["NO_CREDITO"];
    prestamo.pseudonimo        = objeto["PSEUDONIMO"];
    prestamo.descripcion       = objeto["DESCRIPCION"];
    prestamo.saldo             = objeto["SALDO"];
    prestamo.montoDesembolsado = objeto["MONTO_DESEMBOLSADO"];
    prestamo.fechaProxPago     = objeto["PROX_PAGO"];
    prestamo.cuota             = objeto["CUOTA"];
    //console.log("Apodo:", prestamo.pseudonimo);
    return prestamo;
  }

}