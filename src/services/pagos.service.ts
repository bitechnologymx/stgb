import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { HttpUtils } from "../shared/utils/http-utils";

import { Cuenta } from "../services/interfaces/cuentas.iterface";
import { Tarjeta } from "../services/interfaces/tarjetas.interface";
import { Prestamo } from "../services/interfaces/prestamo.iterface";
import { TipoOperacionPago, TrxFavoritaTjta, TrxFavoritaPmo, TrxFavoritaServ,
   Categoria, Servicio, LabelServicio } from "../services/interfaces/pagos.interface";

import { WsRespuesta } from "../services/interfaces/respuesta.interface";

export class WsRespuestaTrxPago {
  codigo  : string;
  mensaje : string;
  token   : string;
}

export class WsFavoritas {
  mensaje : WsRespuesta;
  movimientos : Object[];
}

export class WsCategorias {
  mensaje : WsRespuesta;
  movimientos : Object[];
}

export class WsServicios {
  mensaje : WsRespuesta;
  movimientos : Object[];
}

export class WsLabelServicio {
  mensaje : WsRespuesta;
  label : LabelServicio;
}


@Injectable()
export class PagosService {
 
  private baseUrl : string = HttpUtils.getWsUrl();


  constructor(private http : HttpClient) { }


  obtenerCtasDebito(encryptedSecuencia) {
    let url : string = `${this.baseUrl}/GET_CUENTA_DEBITAR`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    //console.log(url, "\n", formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("obtenerCtasDebito", JSON.stringify(res)); 
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
    cuenta.numCuenta       = objeto["NUM_CUENTA"];
    cuenta.pseudonimo      = objeto["PSEUDONIMO"];
    cuenta.status          = objeto["ESTADO_CTA"];
    cuenta.moneda          = objeto["VMONEDA"];
    cuenta.saldoActual     = objeto["SALDO_ACTUAL"];
    cuenta.saldoTotal      = objeto["SAL_TOTAL_CTA"];
    cuenta.titular         = objeto["TITULAR"];
    cuenta.numTarjeta      = "";
    return cuenta;
  }


  obtenerTjtasDestino(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_TC_DEST`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    //console.log(url, "\n", formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      //console.log("obtenerTjtasDestino", JSON.stringify(res));
      let tarjetas : Tarjeta[] = this.transformaTarjetas(res);
      return tarjetas;
    });
  }

  private transformaTarjetas(res:Object):Tarjeta[]{
    let tarjetas = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      // La respuesta es un array (Varias cuentas).
      arr.forEach( (objeto) => {
        tarjetas.push(this.creaTarjeta(objeto));
      });
    } else {
      // La respuesta es un objeto (una sola cuenta).
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
    return tarjeta;
  }

  obtenerPmosDestino(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_PR_DEST`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url, "\n", formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("obtenerPmosDestino", JSON.stringify(res));
      let prestamos : Prestamo[] = this.transformaPrestamos(res);
      return prestamos;
    });
  }

  private transformaPrestamos(res:Object) : Prestamo[] {
    let prestamos = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      // La respuesta es un array (Varias cuentas).
      arr.forEach( (objeto) => {
        prestamos.push(this.creaPrestamo(objeto));
      });
    } else {
      // La respuesta es un objeto (una sola cuenta).
      prestamos.push(this.creaPrestamo(arr));
    }
    return prestamos;
  }

  private creaPrestamo(objeto : Object) : Prestamo {
    let prestamo : Prestamo  = new Prestamo();
    prestamo.numCredito        = objeto["NO_CREDITO"];
    prestamo.pseudonimo        = objeto["PSEUDONIMO"];
    prestamo.descripcion       = objeto["DESCRIPCION"];
    prestamo.saldo             = objeto["SALDO"];
    prestamo.montoDesembolsado = objeto["MONTO_DESEMBOLSADO"];
    prestamo.fechaProxPago     = objeto["PROX_PAGO"];
    prestamo.cuota             = objeto["CUOTA"];
    return prestamo;
  }


  getTipoOperacionPago(encryptedSecuencia,origen){
    let url:string = `${this.baseUrl}/GET_TIPO_OPERACION`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PORIGEN', origen);
    console.log(url, "-", formData);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => {
      console.log("getTipoOperacionPago", JSON.stringify(res)); 
      let operaciones : TipoOperacionPago[] = this.transformaOperacionPago(res);
      return operaciones;
    });
  }

  private transformaOperacionPago(res:Object): TipoOperacionPago[] {
    let operaciones = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      // La respuesta es un array (Varias cuentas).
      arr.forEach( (objeto) => {
        operaciones.push(this.creaOperacionPago(objeto));
      });
    } else {
      // La respuesta es un objeto (una sola cuenta).
      operaciones.push(this.creaOperacionPago(arr));
    }
    return operaciones;
  }

  private creaOperacionPago(objeto : Object) : TipoOperacionPago {
    let operacion: TipoOperacionPago = new TipoOperacionPago();
    operacion.codigo      = objeto["CODIGO"];
    operacion.descripcion = objeto["DESCRIPCION"];
    return operacion;
  }


  verificaTrx(encryptedSecuencia, origen, tipoOperacion, ctaDebitoEncriptada, cuentaDePago, 
      montoPagar, propositoPago, numCtaTCEncriptada, categoria, servicio
    ) {
    let url : string = `${this.baseUrl}/VERIFICA_TRX`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PORIGEN', origen);
    formData.append('PTIPO_OPERACION', tipoOperacion);
    formData.append('PCD', ctaDebitoEncriptada);
    formData.append('PCP', cuentaDePago);
    formData.append('PMONTO', montoPagar);
    formData.append('PPROPOSITO', propositoPago);
    formData.append('PCTA_TC', numCtaTCEncriptada);
    formData.append('PCATEGORIA', categoria);
    formData.append('PSERVICIO', servicio);
    console.log("\n",url,"\n");

    console.log('\nPSECUENCIA', encryptedSecuencia);
    console.log('\nPORIGEN', origen);
    console.log('\nPTIPO_OPERACION', tipoOperacion);
    console.log('\nPCD', ctaDebitoEncriptada);
    console.log('\nPCP', cuentaDePago);
    console.log('\nPMONTO', montoPagar);
    console.log('\nPPROPOSITO', propositoPago);
    console.log('\nPCTA_TC', numCtaTCEncriptada);
    console.log('\nPCATEGORIA', categoria);
    console.log('\nPSERVICIO', servicio);

    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("verificaTrx", JSON.stringify(res));
      let respuesta : WsRespuestaTrxPago = this.transformaRespuesta(res);
      return respuesta;
    });
  }

  private transformaRespuesta(res:Object) : WsRespuestaTrxPago {
    let respuesta : WsRespuestaTrxPago = new WsRespuestaTrxPago();
    respuesta.codigo  = res["NewDataSet"]["Table"]["PRESP_COD"];
    respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
    respuesta.token   = res["NewDataSet"]["Table"]["PTOKEN"];
    return respuesta;
  }

  realizaTrx(encryptedSecuencia, origen, tipoOperacion, ctaDebitoEncriptada, cuentaDePago, 
    montoPagar, propositoPago, numCtaTCEncriptada, categoria, servicio, token
  ) {
    let url : string = `${this.baseUrl}/REALIZA_TRX`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PORIGEN', origen);
    formData.append('PTIPO_OPERACION', tipoOperacion);
    formData.append('PCD', ctaDebitoEncriptada);
    formData.append('PCP', cuentaDePago);
    formData.append('PMONTO', montoPagar);
    formData.append('PPROPOSITO', propositoPago);
    formData.append('PTOKEN', token);
    formData.append('PCTA_TC', numCtaTCEncriptada);
    formData.append('PCATEGORIA', categoria);
    formData.append('PSERVICIO', servicio);
    console.log("\n",url,"\n");

    console.log('\nPSECUENCIA', encryptedSecuencia);
    console.log('\nPORIGEN', origen);
    console.log('\nPTIPO_OPERACION', tipoOperacion);
    console.log('\nPCD', ctaDebitoEncriptada);
    console.log('\nPCP', cuentaDePago);
    console.log('\nPMONTO', montoPagar);
    console.log('\nPPROPOSITO', propositoPago);
    console.log('\nPTOKEN', token);
    console.log('\nPCTA_TC', numCtaTCEncriptada);
    console.log('\nPCATEGORIA', categoria);
    console.log('\nPSERVICIO', servicio);

    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("realizaTrx", JSON.stringify(res)); 
      let respuesta : WsRespuestaTrxPago = this.transformaRespuesta(res);
      return respuesta;
    });
  }

  // Solicita transacciones favoritas de tarjetas
  solicitaTrxsFavoritasTjtas(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_TC_FAV`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url, "\n", formData);
    //console.log("Secuencia:",encryptedSecuencia);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("solicitaFavoritas", JSON.stringify(res));
      let favoritas : TrxFavoritaTjta[] = this.transformaFavoritasTjtas(res);
      return favoritas;
    });
  }

  private transformaFavoritasTjtas(res) : TrxFavoritaTjta[] {
    let arrResp = [];
    let arr : Array<any> = res["NewDataSet"]["Table"];
    if (Array.isArray(arr)) {
      arr.forEach( (objeto) => {
        arrResp.push(this.creaFavoritaTjta(objeto));
      });
    } else {
      arrResp.push(this.creaFavoritaTjta(arr));
    }
    return arrResp; 
  }
 
  private creaFavoritaTjta(objeto : Object)  {
    let favorita : TrxFavoritaTjta  = new TrxFavoritaTjta();
    favorita.tipoOperacion = objeto["TIPO_OPERACION"];
    favorita.descripcion   = objeto["DES_TIPO_OPERACION"];
    favorita.cuentaDebito  = objeto["CUENTA_DEBITO"];
    favorita.numTarjeta    = objeto["DESTINO"];
    favorita.monto         = objeto["MONTO"];
    return favorita;
  }

  // Solicita transacciones favoritas de prestamos
  solicitaTrxsFavoritasPmos(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_PR_FAV`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url, "\n", formData);
    //console.log("Secuencia:",encryptedSecuencia);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("solicitaTrxsFavoritasPmos", JSON.stringify(res));
      let favoritas : WsFavoritas = this.transformaFavoritasPmos(res);
      return favoritas;
    });
  }
  
  private transformaFavoritasPmos(res:Object) : WsFavoritas {
    let wsData : WsFavoritas = new WsFavoritas();
    let favs : Object[] = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any>  = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {
        // La respuesta es un array (Varios registros).
        obj.forEach( (element) => {
          favs.push(this.creaFavoritaPmo(element));
        });
      } else {
        // La respuesta es un objeto (puede ser una favorita o un mensaje).
        if (obj["PRESP_COD"]) {
          // Es un mensaje
          wsData.mensaje = this.creaRespuesta(obj);
        } else {
          // Es uno solo.
          favs.push(this.creaFavoritaPmo(obj));
        }
      }
    }
    wsData.movimientos = favs;
    return wsData;
  }

  private creaFavoritaPmo(objeto : Object) {
    let favorita : TrxFavoritaPmo  = new TrxFavoritaPmo();
    favorita.tipoOperacion = objeto["TIPO_OPERACION"];
    favorita.descripcion   = objeto["DES_TIPO_OPERACION"];
    favorita.cuentaDebito  = objeto["CUENTA_DEBITO"];
    favorita.numPrestamo   = objeto["DESTINO"];
    favorita.monto         = objeto["MONTO"];
    return favorita;
  }

  private creaRespuesta(objeto:Object) : WsRespuesta {
    let respuesta : WsRespuesta = new WsRespuesta();
    respuesta.codigo  = objeto["PRESP_COD"];
    respuesta.mensaje = objeto["PMENSAJE"];
    return respuesta;
  }

  solicitaTrxsFavoritasServs(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_SERV_FAV`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url, "\n", formData);
    //console.log("Secuencia:",encryptedSecuencia);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("solicitaTrxsFavoritasServs", JSON.stringify(res));
      let favoritas : WsFavoritas = this.transformaFavoritasServs(res);
      return favoritas;
    });
  }

  private transformaFavoritasServs(res:Object) : WsFavoritas {
    let wsData : WsFavoritas = new WsFavoritas();
    let favs : Object[] = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any>  = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {
        // La respuesta es un array (Varios registros).
        obj.forEach( (element) => {
          favs.push(this.creaFavoritaServ(element));
        });
      } else {
        // La respuesta es un objeto (puede ser una favorita o un mensaje).
        if (obj["PRESP_COD"]) {
          // Es un mensaje
          wsData.mensaje = this.creaRespuesta(obj);
        } else {
          // Es uno solo.
          favs.push(this.creaFavoritaServ(obj));
        }
      }
    }
    wsData.movimientos = favs;
    return wsData;
  }

  private creaFavoritaServ(objeto : Object) {
    let favorita : TrxFavoritaServ  = new TrxFavoritaServ();
    favorita.tipoOperacion = objeto["TIPO_OPERACION"];
    favorita.descTipoOper  = objeto["DES_TIPO_OPERACION"];
    favorita.categoria     = objeto["CATEGORIA"];
    favorita.descCategoria = objeto["DES_CATEGORIA"];
    favorita.servicio      = objeto["SERVICIO"];
    favorita.descServicio  = objeto["DES_SERVICIO"];
    favorita.cuentaDebito  = objeto["CUENTA_DEBITO"];
    favorita.cuentaDestino = objeto["DESTINO"];
    favorita.descripcion   = objeto["DESCRIPCION"];
    favorita.monto         = objeto["MONTO"];
    return favorita;
  }


  solicitarCategorias(encryptedSecuencia){
    let url : string = `${this.baseUrl}/GET_CATEGORIA`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    console.log(url, "\n", formData);
    //console.log("Secuencia:",encryptedSecuencia);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("solicitarCategorias", JSON.stringify(res));
      let categorias : WsCategorias = this.transformaCategorias(res);
      return categorias;
    });
  }

  private transformaCategorias(res:Object) : WsCategorias {
    let wsData : WsCategorias = new WsCategorias();
    let categorias : Object[] = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any>  = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {
        // La respuesta es un array (Varios registros).
        obj.forEach( (element) => {
          categorias.push(this.creaCategoria(element));
        });
      } else {
        // La respuesta es un objeto (puede ser un movimiento o un mensaje).
        if (obj["PRESP_COD"]) {
          // Es un mensaje
          wsData.mensaje = this.creaRespuesta(obj);
        } else {
          // Es uno solo movto.
          categorias.push(this.creaCategoria(obj));
        }
      }
    }
    wsData.movimientos = categorias;
    return wsData;
  }

  private creaCategoria(objeto : Object) {
    let categoria : Categoria  = new Categoria();
    categoria.codigo      = objeto["CODIGO"];
    categoria.descripcion = objeto["DESCRIPCION"];
    return categoria;
  }


  solicitarServicios(encryptedSecuencia,codigoCategoria){
    let url : string = `${this.baseUrl}/GET_SERVICIO`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PCATEGORIA', codigoCategoria);
    console.log(url, "\n", formData);
    console.log("PSECUENCIA - ", encryptedSecuencia);
    console.log("PCATEGORIA - ", codigoCategoria);
    //console.log("Secuencia:",encryptedSecuencia);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("solicitarServicios", JSON.stringify(res));
      let servicios : WsServicios = this.transformaServicios(res);
      return servicios;
    });
  }

  private transformaServicios(res:Object) : WsServicios {
    let wsData : WsServicios = new WsServicios();
    let servicios : Object[] = [];
    if (res["NewDataSet"] != null) {
      let obj : Array<any>  = res["NewDataSet"]["Table"];
      if (Array.isArray(obj)) {
        // La respuesta es un array (Varios registros).
        obj.forEach( (element) => {
          servicios.push(this.creaServicio(element));
        });
      } else {
        // La respuesta es un objeto (puede ser un movimiento o un mensaje).
        if (obj["PRESP_COD"]) {
          // Es un mensaje
          wsData.mensaje = this.creaRespuesta(obj);
        } else {
          // Es uno solo movto.
          servicios.push(this.creaServicio(obj));
        }
      }
    }
    wsData.movimientos = servicios;
    return wsData;
  }

  private creaServicio(objeto : Object) {
    let servicio : Servicio  = new Servicio();
    servicio.codigo      = objeto["CODIGO"];
    servicio.descripcion = objeto["DESCRIPCION"];
    return servicio;
  }


  solicitarLabelServicio(encryptedSecuencia,codigoCategoria,codigoServicio){
    let url : string = `${this.baseUrl}/GET_LABEL_SERVICIO`;
    let headers = HttpUtils.createRequestHeaderPost();
    let formData = new FormData();
    formData.append('PSECUENCIA', encryptedSecuencia);
    formData.append('PCATEGORIA', codigoCategoria);
    formData.append('PSERVICIO', codigoServicio);
    console.log(url, "\n", formData);
    //console.log("Secuencia:",encryptedSecuencia);
    return this.http.post(url, formData, {headers:headers,responseType:"json"})
    .map( (res) => { 
      console.log("solicitarLabelServicio", JSON.stringify(res));
      let label : WsLabelServicio = this.transformaLabelServicio(res);
      return label;
    });
  }

  private transformaLabelServicio(res:Object) : WsLabelServicio {
    let wsData : WsLabelServicio = new WsLabelServicio();
    let label : LabelServicio;
    if (res["NewDataSet"] != null) {
      let obj : Object = res["NewDataSet"]["Table"];
      // La respuesta es un objeto (puede ser una label o un mensaje).
      if (obj["PRESP_COD"]) { // Es un mensaje
        wsData.mensaje = this.creaRespuesta(obj);
      } else { // Es una label.
        label = this.creaLabelServicio(obj);
      }
    }
    wsData.label = label;
    return wsData;
  }

  private creaLabelServicio(objeto : Object) {
    let label : LabelServicio  = new LabelServicio();
    label.label      = objeto["LABEL"];
    label.longCuenta = objeto["ACCOUNT_LENGTH"];
    return label;
  }


}