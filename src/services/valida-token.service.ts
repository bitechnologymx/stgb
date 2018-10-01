import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { HttpUtils } from "../shared/utils/http-utils";

export class WsRespuesta {
    codigo : string;
    mensaje : string;
}

@Injectable()
export class ValidaTokenService {
 
  private baseUrl : string = HttpUtils.getWsUrl(); 


  constructor(private http : HttpClient) { 
  }

  validarTokenStatus(encryptedSecuencia,clienteEncriptado) {
    let url : string = `${this.baseUrl}/VALIDATE_TOKEN_STATUS`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PUSER', clienteEncriptado);
    //console.log(url, "\n", "PSECUENCIA:", encryptedSecuencia, "\n", "PUSER:", clienteEncriptado);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      //console.log("validarTokenStatus", JSON.stringify(res));
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