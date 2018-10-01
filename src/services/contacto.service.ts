import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { HttpUtils } from "../shared/utils/http-utils";
import { WsRespuesta } from "../services/interfaces/respuesta.interface";

@Injectable()
export class Contacto {
 
  private baseUrl : string = HttpUtils.getWsUrl(); 

  constructor(private http : HttpClient) { }

  contacto(encryptedSecuencia, usrEmail, usrPhone, usrMessage) {
    let url : string = `${this.baseUrl}/CONTACTO`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PEMAIL',     usrEmail);
    formData.append('PTELF',      usrPhone);
    formData.append('PMSG',       usrMessage);
    //console.log(url, "--",formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      //console.log("contacto", JSON.stringify(res));
      let respuesta : WsRespuesta = this.transformaRespuesta(res);
      return respuesta;
    });
  }

  private transformaRespuesta(res:Object) : WsRespuesta {
    let respuesta : WsRespuesta = new WsRespuesta();
    respuesta.codigo  = res["NewDataSet"]["Table"]["PRESP_COD"];
    respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
    return respuesta;
  }


}