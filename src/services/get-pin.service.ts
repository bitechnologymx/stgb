import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { HttpUtils } from "../shared/utils/http-utils";

export class WsRespuesta {
    codigo : string;
    mensaje : string;
}

@Injectable()
export class GetPinService {
 
  private baseUrl : string = HttpUtils.getWsUrl(); 


  constructor(private http : HttpClient) { 
  }

  solicitarPin(encryptedSecuencia,token,numTarjeta,encryptedNumCuenta) {
    let url : string = `${this.baseUrl}/GET_PIN`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PTOKEN', token);
    formData.append('PTARJETA', numTarjeta);
    formData.append('P_CUENTA', encryptedNumCuenta);
    //console.log(formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      //console.log("solicitarPin", JSON.stringify(res));
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