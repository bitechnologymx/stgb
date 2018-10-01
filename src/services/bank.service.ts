import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { HttpUtils } from "../shared/utils/http-utils";


@Injectable()
export class BankService {

  // private baseUrl:string = "http://10.0.2.2:3000";
  // private baseUrl:string = "http://216.250.114.107:8080/StGeorgesBankServices";

  private baseUrl : string = HttpUtils.getWsUrl();

  constructor(private httpClient : HttpClient) {
  }

  logoutUser(encrypteSec,ipAddr,razonSalida){
    let url = `${this.baseUrl}/LOGOUT_USER`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encrypteSec);
    formData.append('PIP_ADD', ipAddr);
    formData.append('RAZON_SALIDA', razonSalida);
    //console.log("logoutUser:",url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  cambiarPassword(encryptedUsrPwdSec,indCambio,vigencia,hash){
    let url = `${this.baseUrl}/RESET_PASSWORD`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PUSER_PPASSNEW_PSECUENCIA', encryptedUsrPwdSec);
    formData.append('PIND_CAMBIO', indCambio);
    formData.append('PCADUCIDAD', vigencia);
    formData.append('PHASH', hash);
    console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  obtenerPwdVigencia(){
    let url = `${this.baseUrl}/GET_DURACION_CLAVE`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    //console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  validarToken(secuencia,token,clienteEncriptado,ipDisp) {
    let url = `${this.baseUrl}/VALIDATE_TOKEN`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', secuencia);
    formData.append('PTOKEN', token);
    formData.append('PUSER', clienteEncriptado);
    formData.append('PIP_ADD', ipDisp);
    //console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  // Se cre� nuevo servicio independiente 22/08/2018.
  // Cuando se cambie todo a ese nuevo servicio (mensaje.service.ts), se debe eliminar este m�todo.
  obtenerMensaje(codigo){
    let url = `${this.baseUrl}/GET_MENSAJE`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PRESP_COD', codigo);
    //console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  obtenerTipoCliente(encryptedUsrName) {
    let url = `${this.baseUrl}/GET_TIPO_CLIENTE`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PUSER', encryptedUsrName);
    //console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  obtenerUsrImage(encryptedUsrName,modulus,exponent) {
    let url = `${this.baseUrl}/GET_USER_IMAGE`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
      formData.append('PUSER', encryptedUsrName);
      formData.append('PMODULUS', modulus);
      formData.append('PEXPONENT', exponent);
    console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  obtenerUsrImagen(encryptedUsrName,encryptedKeyAES) {
    let url = `${this.baseUrl}/GET_USER_IMAGEN`;
    const headers = HttpUtils.createRequestHeaderPost();
    const formData = new FormData();
    formData.append('PUSER', encryptedUsrName);
    formData.append('PENVIO', encryptedKeyAES);
    console.log(url, "-", formData);
    return this.httpClient.post(url, formData, { headers:headers, responseType:"json" });
  }

  genPemPrivateKey(xmlPrivateKey) {
    let url = `${this.baseUrl}/GEN_KEYS`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
      formData.append('PK', xmlPrivateKey);
    console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }


  validarUsrLogin(encryptedNaP,ipDisp,dataDisp){
    let url = `${this.baseUrl}/VALIDATE_USER_PWD_LOGIN`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PUSER_PPAS', encryptedNaP);
    formData.append('PIP_ADD', ipDisp);
    formData.append('PDATA_DISPOSITIVO', dataDisp);
    console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  obtenerUltimoAcceso(encryptedSecuencia){
    let url = `${this.baseUrl}/GET_USER_INTRO_DATA`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    //console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  obtenerTiposDeCuentas(encryptedSecuencia) {
    let url = `${this.baseUrl}/GET_TIPO_CUENTAS`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    //console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"});
  }

  // Ok Kinvey
  obtenerSucursales(){
    let url:string = `${this.baseUrl}/GET_SUCURSALES`;
    let headers = HttpUtils.createRequestHeaderPost();
    console.log(url);
    return this.httpClient.post(url,"",{headers:headers,responseType:"json"});
  }

  obtenerSucursalesSecuencia(encryptedSecuencia){
    let url:string = `${this.baseUrl}/GET_SUCURSALES`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url);
    return this.httpClient.post(url,formData,{headers:headers,responseType:"json"});
  }

  revisaBLStatus(encryptedSecuencia){
    let url:string = `${this.baseUrl}/GET_BL_STATUS`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url, "-", formData);
    return this.httpClient.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => {
      console.log("revisaBLStatus", JSON.stringify(res));
      let status : string = res["NewDataSet"]["Table"]["PESTADO"];
      return status;
    });
  }


}
