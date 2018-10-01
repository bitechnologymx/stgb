"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
var http_utils_1 = require("../shared/utils/http-utils");
var cuentas_iterface_1 = require("../services/interfaces/cuentas.iterface");
var tarjetas_interface_1 = require("../services/interfaces/tarjetas.interface");
var prestamo_iterface_1 = require("../services/interfaces/prestamo.iterface");
var pagos_interface_1 = require("../services/interfaces/pagos.interface");
var respuesta_interface_1 = require("../services/interfaces/respuesta.interface");
var WsRespuestaTrxPago = /** @class */ (function () {
    function WsRespuestaTrxPago() {
    }
    return WsRespuestaTrxPago;
}());
exports.WsRespuestaTrxPago = WsRespuestaTrxPago;
var WsFavoritas = /** @class */ (function () {
    function WsFavoritas() {
    }
    return WsFavoritas;
}());
exports.WsFavoritas = WsFavoritas;
var WsCategorias = /** @class */ (function () {
    function WsCategorias() {
    }
    return WsCategorias;
}());
exports.WsCategorias = WsCategorias;
var WsServicios = /** @class */ (function () {
    function WsServicios() {
    }
    return WsServicios;
}());
exports.WsServicios = WsServicios;
var WsLabelServicio = /** @class */ (function () {
    function WsLabelServicio() {
    }
    return WsLabelServicio;
}());
exports.WsLabelServicio = WsLabelServicio;
var PagosService = /** @class */ (function () {
    function PagosService(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    PagosService.prototype.obtenerCtasDebito = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_CUENTA_DEBITAR";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        //console.log(url, "\n", formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("obtenerCtasDebito", JSON.stringify(res));
            var cuentas = _this.transformaCuentas(res);
            return cuentas;
        });
    };
    PagosService.prototype.transformaCuentas = function (res) {
        var _this = this;
        var cuentas = [];
        var arr = res["NewDataSet"]["Table"];
        if (Array.isArray(arr)) {
            // La respuesta es un array (Varias cuentas).
            arr.forEach(function (objeto) {
                cuentas.push(_this.creaCuenta(objeto));
            });
        }
        else {
            // La respuesta es un objeto (una sola cuenta).
            cuentas.push(this.creaCuenta(arr));
        }
        return cuentas;
    };
    PagosService.prototype.creaCuenta = function (objeto) {
        var cuenta = new cuentas_iterface_1.Cuenta();
        cuenta.numCuenta = objeto["NUM_CUENTA"];
        cuenta.pseudonimo = objeto["PSEUDONIMO"];
        cuenta.status = objeto["ESTADO_CTA"];
        cuenta.moneda = objeto["VMONEDA"];
        cuenta.saldoActual = objeto["SALDO_ACTUAL"];
        cuenta.saldoTotal = objeto["SAL_TOTAL_CTA"];
        cuenta.titular = objeto["TITULAR"];
        cuenta.numTarjeta = "";
        return cuenta;
    };
    PagosService.prototype.obtenerTjtasDestino = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_TC_DEST";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        //console.log(url, "\n", formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            //console.log("obtenerTjtasDestino", JSON.stringify(res));
            var tarjetas = _this.transformaTarjetas(res);
            return tarjetas;
        });
    };
    PagosService.prototype.transformaTarjetas = function (res) {
        var _this = this;
        var tarjetas = [];
        var arr = res["NewDataSet"]["Table"];
        if (Array.isArray(arr)) {
            // La respuesta es un array (Varias cuentas).
            arr.forEach(function (objeto) {
                tarjetas.push(_this.creaTarjeta(objeto));
            });
        }
        else {
            // La respuesta es un objeto (una sola cuenta).
            tarjetas.push(this.creaTarjeta(arr));
        }
        return tarjetas;
    };
    PagosService.prototype.creaTarjeta = function (objeto) {
        var tarjeta = new tarjetas_interface_1.Tarjeta();
        tarjeta.numTarjeta = objeto["NUM_TARJETA"];
        tarjeta.pseudonimo = objeto["PSEUDONIMO"];
        tarjeta.producto = objeto["PRODUCTO"];
        tarjeta.saldo = objeto["SALDO"];
        tarjeta.disponible = objeto["DISPONIBLE"];
        tarjeta.tipoTC = objeto["TIPO_TC"];
        tarjeta.numCuenta = objeto["NUM_CTA_CREDITO"];
        return tarjeta;
    };
    PagosService.prototype.obtenerPmosDestino = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_PR_DEST";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        console.log(url, "\n", formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("obtenerPmosDestino", JSON.stringify(res));
            var prestamos = _this.transformaPrestamos(res);
            return prestamos;
        });
    };
    PagosService.prototype.transformaPrestamos = function (res) {
        var _this = this;
        var prestamos = [];
        var arr = res["NewDataSet"]["Table"];
        if (Array.isArray(arr)) {
            // La respuesta es un array (Varias cuentas).
            arr.forEach(function (objeto) {
                prestamos.push(_this.creaPrestamo(objeto));
            });
        }
        else {
            // La respuesta es un objeto (una sola cuenta).
            prestamos.push(this.creaPrestamo(arr));
        }
        return prestamos;
    };
    PagosService.prototype.creaPrestamo = function (objeto) {
        var prestamo = new prestamo_iterface_1.Prestamo();
        prestamo.numCredito = objeto["NO_CREDITO"];
        prestamo.pseudonimo = objeto["PSEUDONIMO"];
        prestamo.descripcion = objeto["DESCRIPCION"];
        prestamo.saldo = objeto["SALDO"];
        prestamo.montoDesembolsado = objeto["MONTO_DESEMBOLSADO"];
        prestamo.fechaProxPago = objeto["PROX_PAGO"];
        prestamo.cuota = objeto["CUOTA"];
        return prestamo;
    };
    PagosService.prototype.getTipoOperacionPago = function (encryptedSecuencia, origen) {
        var _this = this;
        var url = this.baseUrl + "/GET_TIPO_OPERACION";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PORIGEN', origen);
        console.log(url, "-", formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("getTipoOperacionPago", JSON.stringify(res));
            var operaciones = _this.transformaOperacionPago(res);
            return operaciones;
        });
    };
    PagosService.prototype.transformaOperacionPago = function (res) {
        var _this = this;
        var operaciones = [];
        var arr = res["NewDataSet"]["Table"];
        if (Array.isArray(arr)) {
            // La respuesta es un array (Varias cuentas).
            arr.forEach(function (objeto) {
                operaciones.push(_this.creaOperacionPago(objeto));
            });
        }
        else {
            // La respuesta es un objeto (una sola cuenta).
            operaciones.push(this.creaOperacionPago(arr));
        }
        return operaciones;
    };
    PagosService.prototype.creaOperacionPago = function (objeto) {
        var operacion = new pagos_interface_1.TipoOperacionPago();
        operacion.codigo = objeto["CODIGO"];
        operacion.descripcion = objeto["DESCRIPCION"];
        return operacion;
    };
    PagosService.prototype.verificaTrx = function (encryptedSecuencia, origen, tipoOperacion, ctaDebitoEncriptada, cuentaDePago, montoPagar, propositoPago, numCtaTCEncriptada, categoria, servicio) {
        var _this = this;
        var url = this.baseUrl + "/VERIFICA_TRX";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
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
        console.log("\n", url, "\n");
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
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("verificaTrx", JSON.stringify(res));
            var respuesta = _this.transformaRespuesta(res);
            return respuesta;
        });
    };
    PagosService.prototype.transformaRespuesta = function (res) {
        var respuesta = new WsRespuestaTrxPago();
        respuesta.codigo = res["NewDataSet"]["Table"]["PRESP_COD"];
        respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
        respuesta.token = res["NewDataSet"]["Table"]["PTOKEN"];
        return respuesta;
    };
    PagosService.prototype.realizaTrx = function (encryptedSecuencia, origen, tipoOperacion, ctaDebitoEncriptada, cuentaDePago, montoPagar, propositoPago, numCtaTCEncriptada, categoria, servicio, token) {
        var _this = this;
        var url = this.baseUrl + "/REALIZA_TRX";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
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
        console.log("\n", url, "\n");
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
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("realizaTrx", JSON.stringify(res));
            var respuesta = _this.transformaRespuesta(res);
            return respuesta;
        });
    };
    // Solicita transacciones favoritas de tarjetas
    PagosService.prototype.solicitaTrxsFavoritasTjtas = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_TC_FAV";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        console.log(url, "\n", formData);
        //console.log("Secuencia:",encryptedSecuencia);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("solicitaFavoritas", JSON.stringify(res));
            var favoritas = _this.transformaFavoritasTjtas(res);
            return favoritas;
        });
    };
    PagosService.prototype.transformaFavoritasTjtas = function (res) {
        var _this = this;
        var arrResp = [];
        var arr = res["NewDataSet"]["Table"];
        if (Array.isArray(arr)) {
            arr.forEach(function (objeto) {
                arrResp.push(_this.creaFavoritaTjta(objeto));
            });
        }
        else {
            arrResp.push(this.creaFavoritaTjta(arr));
        }
        return arrResp;
    };
    PagosService.prototype.creaFavoritaTjta = function (objeto) {
        var favorita = new pagos_interface_1.TrxFavoritaTjta();
        favorita.tipoOperacion = objeto["TIPO_OPERACION"];
        favorita.descripcion = objeto["DES_TIPO_OPERACION"];
        favorita.cuentaDebito = objeto["CUENTA_DEBITO"];
        favorita.numTarjeta = objeto["DESTINO"];
        favorita.monto = objeto["MONTO"];
        return favorita;
    };
    // Solicita transacciones favoritas de prestamos
    PagosService.prototype.solicitaTrxsFavoritasPmos = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_PR_FAV";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        console.log(url, "\n", formData);
        //console.log("Secuencia:",encryptedSecuencia);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("solicitaTrxsFavoritasPmos", JSON.stringify(res));
            var favoritas = _this.transformaFavoritasPmos(res);
            return favoritas;
        });
    };
    PagosService.prototype.transformaFavoritasPmos = function (res) {
        var _this = this;
        var wsData = new WsFavoritas();
        var favs = [];
        if (res["NewDataSet"] != null) {
            var obj = res["NewDataSet"]["Table"];
            if (Array.isArray(obj)) {
                // La respuesta es un array (Varios registros).
                obj.forEach(function (element) {
                    favs.push(_this.creaFavoritaPmo(element));
                });
            }
            else {
                // La respuesta es un objeto (puede ser una favorita o un mensaje).
                if (obj["PRESP_COD"]) {
                    // Es un mensaje
                    wsData.mensaje = this.creaRespuesta(obj);
                }
                else {
                    // Es uno solo.
                    favs.push(this.creaFavoritaPmo(obj));
                }
            }
        }
        wsData.movimientos = favs;
        return wsData;
    };
    PagosService.prototype.creaFavoritaPmo = function (objeto) {
        var favorita = new pagos_interface_1.TrxFavoritaPmo();
        favorita.tipoOperacion = objeto["TIPO_OPERACION"];
        favorita.descripcion = objeto["DES_TIPO_OPERACION"];
        favorita.cuentaDebito = objeto["CUENTA_DEBITO"];
        favorita.numPrestamo = objeto["DESTINO"];
        favorita.monto = objeto["MONTO"];
        return favorita;
    };
    PagosService.prototype.creaRespuesta = function (objeto) {
        var respuesta = new respuesta_interface_1.WsRespuesta();
        respuesta.codigo = objeto["PRESP_COD"];
        respuesta.mensaje = objeto["PMENSAJE"];
        return respuesta;
    };
    PagosService.prototype.solicitaTrxsFavoritasServs = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_SERV_FAV";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        console.log(url, "\n", formData);
        //console.log("Secuencia:",encryptedSecuencia);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("solicitaTrxsFavoritasServs", JSON.stringify(res));
            var favoritas = _this.transformaFavoritasServs(res);
            return favoritas;
        });
    };
    PagosService.prototype.transformaFavoritasServs = function (res) {
        var _this = this;
        var wsData = new WsFavoritas();
        var favs = [];
        if (res["NewDataSet"] != null) {
            var obj = res["NewDataSet"]["Table"];
            if (Array.isArray(obj)) {
                // La respuesta es un array (Varios registros).
                obj.forEach(function (element) {
                    favs.push(_this.creaFavoritaServ(element));
                });
            }
            else {
                // La respuesta es un objeto (puede ser una favorita o un mensaje).
                if (obj["PRESP_COD"]) {
                    // Es un mensaje
                    wsData.mensaje = this.creaRespuesta(obj);
                }
                else {
                    // Es uno solo.
                    favs.push(this.creaFavoritaServ(obj));
                }
            }
        }
        wsData.movimientos = favs;
        return wsData;
    };
    PagosService.prototype.creaFavoritaServ = function (objeto) {
        var favorita = new pagos_interface_1.TrxFavoritaServ();
        favorita.tipoOperacion = objeto["TIPO_OPERACION"];
        favorita.descTipoOper = objeto["DES_TIPO_OPERACION"];
        favorita.categoria = objeto["CATEGORIA"];
        favorita.descCategoria = objeto["DES_CATEGORIA"];
        favorita.servicio = objeto["SERVICIO"];
        favorita.descServicio = objeto["DES_SERVICIO"];
        favorita.cuentaDebito = objeto["CUENTA_DEBITO"];
        favorita.cuentaDestino = objeto["DESTINO"];
        favorita.descripcion = objeto["DESCRIPCION"];
        favorita.monto = objeto["MONTO"];
        return favorita;
    };
    PagosService.prototype.solicitarCategorias = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_CATEGORIA";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        console.log(url, "\n", formData);
        //console.log("Secuencia:",encryptedSecuencia);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("solicitarCategorias", JSON.stringify(res));
            var categorias = _this.transformaCategorias(res);
            return categorias;
        });
    };
    PagosService.prototype.transformaCategorias = function (res) {
        var _this = this;
        var wsData = new WsCategorias();
        var categorias = [];
        if (res["NewDataSet"] != null) {
            var obj = res["NewDataSet"]["Table"];
            if (Array.isArray(obj)) {
                // La respuesta es un array (Varios registros).
                obj.forEach(function (element) {
                    categorias.push(_this.creaCategoria(element));
                });
            }
            else {
                // La respuesta es un objeto (puede ser un movimiento o un mensaje).
                if (obj["PRESP_COD"]) {
                    // Es un mensaje
                    wsData.mensaje = this.creaRespuesta(obj);
                }
                else {
                    // Es uno solo movto.
                    categorias.push(this.creaCategoria(obj));
                }
            }
        }
        wsData.movimientos = categorias;
        return wsData;
    };
    PagosService.prototype.creaCategoria = function (objeto) {
        var categoria = new pagos_interface_1.Categoria();
        categoria.codigo = objeto["CODIGO"];
        categoria.descripcion = objeto["DESCRIPCION"];
        return categoria;
    };
    PagosService.prototype.solicitarServicios = function (encryptedSecuencia, codigoCategoria) {
        var _this = this;
        var url = this.baseUrl + "/GET_SERVICIO";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PCATEGORIA', codigoCategoria);
        console.log(url, "\n", formData);
        console.log("PSECUENCIA - ", encryptedSecuencia);
        console.log("PCATEGORIA - ", codigoCategoria);
        //console.log("Secuencia:",encryptedSecuencia);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("solicitarServicios", JSON.stringify(res));
            var servicios = _this.transformaServicios(res);
            return servicios;
        });
    };
    PagosService.prototype.transformaServicios = function (res) {
        var _this = this;
        var wsData = new WsServicios();
        var servicios = [];
        if (res["NewDataSet"] != null) {
            var obj = res["NewDataSet"]["Table"];
            if (Array.isArray(obj)) {
                // La respuesta es un array (Varios registros).
                obj.forEach(function (element) {
                    servicios.push(_this.creaServicio(element));
                });
            }
            else {
                // La respuesta es un objeto (puede ser un movimiento o un mensaje).
                if (obj["PRESP_COD"]) {
                    // Es un mensaje
                    wsData.mensaje = this.creaRespuesta(obj);
                }
                else {
                    // Es uno solo movto.
                    servicios.push(this.creaServicio(obj));
                }
            }
        }
        wsData.movimientos = servicios;
        return wsData;
    };
    PagosService.prototype.creaServicio = function (objeto) {
        var servicio = new pagos_interface_1.Servicio();
        servicio.codigo = objeto["CODIGO"];
        servicio.descripcion = objeto["DESCRIPCION"];
        return servicio;
    };
    PagosService.prototype.solicitarLabelServicio = function (encryptedSecuencia, codigoCategoria, codigoServicio) {
        var _this = this;
        var url = this.baseUrl + "/GET_LABEL_SERVICIO";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PCATEGORIA', codigoCategoria);
        formData.append('PSERVICIO', codigoServicio);
        console.log(url, "\n", formData);
        //console.log("Secuencia:",encryptedSecuencia);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("solicitarLabelServicio", JSON.stringify(res));
            var label = _this.transformaLabelServicio(res);
            return label;
        });
    };
    PagosService.prototype.transformaLabelServicio = function (res) {
        var wsData = new WsLabelServicio();
        var label;
        if (res["NewDataSet"] != null) {
            var obj = res["NewDataSet"]["Table"];
            // La respuesta es un objeto (puede ser una label o un mensaje).
            if (obj["PRESP_COD"]) {
                wsData.mensaje = this.creaRespuesta(obj);
            }
            else {
                label = this.creaLabelServicio(obj);
            }
        }
        wsData.label = label;
        return wsData;
    };
    PagosService.prototype.creaLabelServicio = function (objeto) {
        var label = new pagos_interface_1.LabelServicio();
        label.label = objeto["LABEL"];
        label.longCuenta = objeto["ACCOUNT_LENGTH"];
        return label;
    };
    PagosService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PagosService);
    return PagosService;
}());
exports.PagosService = PagosService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnb3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ29zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQWtEO0FBQ2xELGlDQUErQjtBQUUvQix5REFBdUQ7QUFFdkQsNEVBQWlFO0FBQ2pFLGdGQUFvRTtBQUNwRSw4RUFBb0U7QUFDcEUsMEVBQ3NGO0FBRXRGLGtGQUF5RTtBQUV6RTtJQUFBO0lBSUEsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxnREFBa0I7QUFNL0I7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0NBQVc7QUFLeEI7SUFBQTtJQUdBLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksb0NBQVk7QUFLekI7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0NBQVc7QUFLeEI7SUFBQTtJQUdBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksMENBQWU7QUFPNUI7SUFLRSxzQkFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUg3QixZQUFPLEdBQVksc0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUdQLENBQUM7SUFHMUMsd0NBQWlCLEdBQWpCLFVBQWtCLGtCQUFrQjtRQUFwQyxpQkFZQztRQVhDLElBQUksR0FBRyxHQUFlLElBQUksQ0FBQyxPQUFPLHdCQUFxQixDQUFDO1FBQ3hELElBQUksT0FBTyxHQUFHLHNCQUFTLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbEQsbUNBQW1DO1FBQ25DLE1B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LEdBQVksR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLGdFQUFnRTtZQUNoRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx3Q0FBaUIsR0FBekIsVUFBMEIsTUFBZTtRQUN2QyxJQUFJLEtBQUssR0FBb0IsSUFBSSwrQkFBYSxFQUFFLENBQUM7UUFDakQsS0FBSyxDQUFDLEtBQUssR0FBUSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQWxpQlUsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQU1nQixpQkFBVTtPQUwxQixZQUFZLENBcWlCeEI7SUFBRCxtQkFBQztDQUFBLEFBcmlCRCxJQXFpQkM7QUFyaUJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcblxyXG5pbXBvcnQgeyBIdHRwVXRpbHMgfSBmcm9tIFwiLi4vc2hhcmVkL3V0aWxzL2h0dHAtdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IEN1ZW50YSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pbnRlcmZhY2VzL2N1ZW50YXMuaXRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFyamV0YSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pbnRlcmZhY2VzL3RhcmpldGFzLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQcmVzdGFtbyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pbnRlcmZhY2VzL3ByZXN0YW1vLml0ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpcG9PcGVyYWNpb25QYWdvLCBUcnhGYXZvcml0YVRqdGEsIFRyeEZhdm9yaXRhUG1vLCBUcnhGYXZvcml0YVNlcnYsXHJcbiAgIENhdGVnb3JpYSwgU2VydmljaW8sIExhYmVsU2VydmljaW8gfSBmcm9tIFwiLi4vc2VydmljZXMvaW50ZXJmYWNlcy9wYWdvcy5pbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFdzUmVzcHVlc3RhIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2ludGVyZmFjZXMvcmVzcHVlc3RhLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdzUmVzcHVlc3RhVHJ4UGFnbyB7XHJcbiAgY29kaWdvICA6IHN0cmluZztcclxuICBtZW5zYWplIDogc3RyaW5nO1xyXG4gIHRva2VuICAgOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXc0Zhdm9yaXRhcyB7XHJcbiAgbWVuc2FqZSA6IFdzUmVzcHVlc3RhO1xyXG4gIG1vdmltaWVudG9zIDogT2JqZWN0W107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXc0NhdGVnb3JpYXMge1xyXG4gIG1lbnNhamUgOiBXc1Jlc3B1ZXN0YTtcclxuICBtb3ZpbWllbnRvcyA6IE9iamVjdFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV3NTZXJ2aWNpb3Mge1xyXG4gIG1lbnNhamUgOiBXc1Jlc3B1ZXN0YTtcclxuICBtb3ZpbWllbnRvcyA6IE9iamVjdFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV3NMYWJlbFNlcnZpY2lvIHtcclxuICBtZW5zYWplIDogV3NSZXNwdWVzdGE7XHJcbiAgbGFiZWwgOiBMYWJlbFNlcnZpY2lvO1xyXG59XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGFnb3NTZXJ2aWNlIHtcclxuIFxyXG4gIHByaXZhdGUgYmFzZVVybCA6IHN0cmluZyA9IEh0dHBVdGlscy5nZXRXc1VybCgpO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwIDogSHR0cENsaWVudCkgeyB9XHJcblxyXG5cclxuICBvYnRlbmVyQ3Rhc0RlYml0byhlbmNyeXB0ZWRTZWN1ZW5jaWEpIHtcclxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L0dFVF9DVUVOVEFfREVCSVRBUmA7XHJcbiAgICBsZXQgaGVhZGVycyA9IEh0dHBVdGlscy5jcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BTRUNVRU5DSUEnLCBlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgLy9jb25zb2xlLmxvZyh1cmwsIFwiXFxuXCIsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7IFxyXG4gICAgICBjb25zb2xlLmxvZyhcIm9idGVuZXJDdGFzRGViaXRvXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpOyBcclxuICAgICAgbGV0IGN1ZW50YXMgOiBDdWVudGFbXSA9IHRoaXMudHJhbnNmb3JtYUN1ZW50YXMocmVzKTtcclxuICAgICAgcmV0dXJuIGN1ZW50YXM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtYUN1ZW50YXMocmVzOk9iamVjdCk6Q3VlbnRhW117XHJcbiAgICBsZXQgY3VlbnRhcyA9IFtdO1xyXG4gICAgbGV0IGFyciA6IEFycmF5PGFueT4gPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl07XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XHJcbiAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBhcnJheSAoVmFyaWFzIGN1ZW50YXMpLlxyXG4gICAgICBhcnIuZm9yRWFjaCggKG9iamV0bykgPT4ge1xyXG4gICAgICAgIGN1ZW50YXMucHVzaCh0aGlzLmNyZWFDdWVudGEob2JqZXRvKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTGEgcmVzcHVlc3RhIGVzIHVuIG9iamV0byAodW5hIHNvbGEgY3VlbnRhKS5cclxuICAgICAgY3VlbnRhcy5wdXNoKHRoaXMuY3JlYUN1ZW50YShhcnIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjdWVudGFzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhQ3VlbnRhKG9iamV0byA6IE9iamVjdCkgOiBDdWVudGEge1xyXG4gICAgbGV0IGN1ZW50YTpDdWVudGEgPSBuZXcgQ3VlbnRhKCk7XHJcbiAgICBjdWVudGEubnVtQ3VlbnRhICAgICAgID0gb2JqZXRvW1wiTlVNX0NVRU5UQVwiXTtcclxuICAgIGN1ZW50YS5wc2V1ZG9uaW1vICAgICAgPSBvYmpldG9bXCJQU0VVRE9OSU1PXCJdO1xyXG4gICAgY3VlbnRhLnN0YXR1cyAgICAgICAgICA9IG9iamV0b1tcIkVTVEFET19DVEFcIl07XHJcbiAgICBjdWVudGEubW9uZWRhICAgICAgICAgID0gb2JqZXRvW1wiVk1PTkVEQVwiXTtcclxuICAgIGN1ZW50YS5zYWxkb0FjdHVhbCAgICAgPSBvYmpldG9bXCJTQUxET19BQ1RVQUxcIl07XHJcbiAgICBjdWVudGEuc2FsZG9Ub3RhbCAgICAgID0gb2JqZXRvW1wiU0FMX1RPVEFMX0NUQVwiXTtcclxuICAgIGN1ZW50YS50aXR1bGFyICAgICAgICAgPSBvYmpldG9bXCJUSVRVTEFSXCJdO1xyXG4gICAgY3VlbnRhLm51bVRhcmpldGEgICAgICA9IFwiXCI7XHJcbiAgICByZXR1cm4gY3VlbnRhO1xyXG4gIH1cclxuXHJcblxyXG4gIG9idGVuZXJUanRhc0Rlc3Rpbm8oZW5jcnlwdGVkU2VjdWVuY2lhKXtcclxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L0dFVF9UQ19ERVNUYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHVybCwgXCJcXG5cIiwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJvYnRlbmVyVGp0YXNEZXN0aW5vXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgdGFyamV0YXMgOiBUYXJqZXRhW10gPSB0aGlzLnRyYW5zZm9ybWFUYXJqZXRhcyhyZXMpO1xyXG4gICAgICByZXR1cm4gdGFyamV0YXM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtYVRhcmpldGFzKHJlczpPYmplY3QpOlRhcmpldGFbXXtcclxuICAgIGxldCB0YXJqZXRhcyA9IFtdO1xyXG4gICAgbGV0IGFyciA6IEFycmF5PGFueT4gPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl07XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XHJcbiAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBhcnJheSAoVmFyaWFzIGN1ZW50YXMpLlxyXG4gICAgICBhcnIuZm9yRWFjaCggKG9iamV0bykgPT4ge1xyXG4gICAgICAgIHRhcmpldGFzLnB1c2godGhpcy5jcmVhVGFyamV0YShvYmpldG8pKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvICh1bmEgc29sYSBjdWVudGEpLlxyXG4gICAgICB0YXJqZXRhcy5wdXNoKHRoaXMuY3JlYVRhcmpldGEoYXJyKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyamV0YXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWFUYXJqZXRhKG9iamV0byA6IE9iamVjdCkgOiBUYXJqZXRhIHtcclxuICAgIGxldCB0YXJqZXRhOlRhcmpldGEgPSBuZXcgVGFyamV0YSgpO1xyXG4gICAgdGFyamV0YS5udW1UYXJqZXRhICAgICAgPSBvYmpldG9bXCJOVU1fVEFSSkVUQVwiXTtcclxuICAgIHRhcmpldGEucHNldWRvbmltbyAgICAgID0gb2JqZXRvW1wiUFNFVURPTklNT1wiXTtcclxuICAgIHRhcmpldGEucHJvZHVjdG8gICAgICAgID0gb2JqZXRvW1wiUFJPRFVDVE9cIl07XHJcbiAgICB0YXJqZXRhLnNhbGRvICAgICAgICAgICA9IG9iamV0b1tcIlNBTERPXCJdO1xyXG4gICAgdGFyamV0YS5kaXNwb25pYmxlICAgICAgPSBvYmpldG9bXCJESVNQT05JQkxFXCJdO1xyXG4gICAgdGFyamV0YS50aXBvVEMgICAgICAgICAgPSBvYmpldG9bXCJUSVBPX1RDXCJdO1xyXG4gICAgdGFyamV0YS5udW1DdWVudGEgICAgICAgPSBvYmpldG9bXCJOVU1fQ1RBX0NSRURJVE9cIl07XHJcbiAgICByZXR1cm4gdGFyamV0YTtcclxuICB9XHJcblxyXG4gIG9idGVuZXJQbW9zRGVzdGlubyhlbmNyeXB0ZWRTZWN1ZW5jaWEpe1xyXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IGAke3RoaXMuYmFzZVVybH0vR0VUX1BSX0RFU1RgO1xyXG4gICAgbGV0IGhlYWRlcnMgPSBIdHRwVXRpbHMuY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKTtcclxuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VDVUVOQ0lBJywgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIGNvbnNvbGUubG9nKHVybCwgXCJcXG5cIiwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwib2J0ZW5lclBtb3NEZXN0aW5vXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgcHJlc3RhbW9zIDogUHJlc3RhbW9bXSA9IHRoaXMudHJhbnNmb3JtYVByZXN0YW1vcyhyZXMpO1xyXG4gICAgICByZXR1cm4gcHJlc3RhbW9zO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFQcmVzdGFtb3MocmVzOk9iamVjdCkgOiBQcmVzdGFtb1tdIHtcclxuICAgIGxldCBwcmVzdGFtb3MgPSBbXTtcclxuICAgIGxldCBhcnIgOiBBcnJheTxhbnk+ID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gYXJyYXkgKFZhcmlhcyBjdWVudGFzKS5cclxuICAgICAgYXJyLmZvckVhY2goIChvYmpldG8pID0+IHtcclxuICAgICAgICBwcmVzdGFtb3MucHVzaCh0aGlzLmNyZWFQcmVzdGFtbyhvYmpldG8pKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvICh1bmEgc29sYSBjdWVudGEpLlxyXG4gICAgICBwcmVzdGFtb3MucHVzaCh0aGlzLmNyZWFQcmVzdGFtbyhhcnIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmVzdGFtb3M7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWFQcmVzdGFtbyhvYmpldG8gOiBPYmplY3QpIDogUHJlc3RhbW8ge1xyXG4gICAgbGV0IHByZXN0YW1vIDogUHJlc3RhbW8gID0gbmV3IFByZXN0YW1vKCk7XHJcbiAgICBwcmVzdGFtby5udW1DcmVkaXRvICAgICAgICA9IG9iamV0b1tcIk5PX0NSRURJVE9cIl07XHJcbiAgICBwcmVzdGFtby5wc2V1ZG9uaW1vICAgICAgICA9IG9iamV0b1tcIlBTRVVET05JTU9cIl07XHJcbiAgICBwcmVzdGFtby5kZXNjcmlwY2lvbiAgICAgICA9IG9iamV0b1tcIkRFU0NSSVBDSU9OXCJdO1xyXG4gICAgcHJlc3RhbW8uc2FsZG8gICAgICAgICAgICAgPSBvYmpldG9bXCJTQUxET1wiXTtcclxuICAgIHByZXN0YW1vLm1vbnRvRGVzZW1ib2xzYWRvID0gb2JqZXRvW1wiTU9OVE9fREVTRU1CT0xTQURPXCJdO1xyXG4gICAgcHJlc3RhbW8uZmVjaGFQcm94UGFnbyAgICAgPSBvYmpldG9bXCJQUk9YX1BBR09cIl07XHJcbiAgICBwcmVzdGFtby5jdW90YSAgICAgICAgICAgICA9IG9iamV0b1tcIkNVT1RBXCJdO1xyXG4gICAgcmV0dXJuIHByZXN0YW1vO1xyXG4gIH1cclxuXHJcblxyXG4gIGdldFRpcG9PcGVyYWNpb25QYWdvKGVuY3J5cHRlZFNlY3VlbmNpYSxvcmlnZW4pe1xyXG4gICAgbGV0IHVybDpzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L0dFVF9USVBPX09QRVJBQ0lPTmA7XHJcbiAgICBsZXQgaGVhZGVycyA9IEh0dHBVdGlscy5jcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BTRUNVRU5DSUEnLCBlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQT1JJR0VOJywgb3JpZ2VuKTtcclxuICAgIGNvbnNvbGUubG9nKHVybCwgXCItXCIsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2V0VGlwb09wZXJhY2lvblBhZ29cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxyXG4gICAgICBsZXQgb3BlcmFjaW9uZXMgOiBUaXBvT3BlcmFjaW9uUGFnb1tdID0gdGhpcy50cmFuc2Zvcm1hT3BlcmFjaW9uUGFnbyhyZXMpO1xyXG4gICAgICByZXR1cm4gb3BlcmFjaW9uZXM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtYU9wZXJhY2lvblBhZ28ocmVzOk9iamVjdCk6IFRpcG9PcGVyYWNpb25QYWdvW10ge1xyXG4gICAgbGV0IG9wZXJhY2lvbmVzID0gW107XHJcbiAgICBsZXQgYXJyIDogQXJyYXk8YW55PiA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcclxuICAgICAgLy8gTGEgcmVzcHVlc3RhIGVzIHVuIGFycmF5IChWYXJpYXMgY3VlbnRhcykuXHJcbiAgICAgIGFyci5mb3JFYWNoKCAob2JqZXRvKSA9PiB7XHJcbiAgICAgICAgb3BlcmFjaW9uZXMucHVzaCh0aGlzLmNyZWFPcGVyYWNpb25QYWdvKG9iamV0bykpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBvYmpldG8gKHVuYSBzb2xhIGN1ZW50YSkuXHJcbiAgICAgIG9wZXJhY2lvbmVzLnB1c2godGhpcy5jcmVhT3BlcmFjaW9uUGFnbyhhcnIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcGVyYWNpb25lcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYU9wZXJhY2lvblBhZ28ob2JqZXRvIDogT2JqZWN0KSA6IFRpcG9PcGVyYWNpb25QYWdvIHtcclxuICAgIGxldCBvcGVyYWNpb246IFRpcG9PcGVyYWNpb25QYWdvID0gbmV3IFRpcG9PcGVyYWNpb25QYWdvKCk7XHJcbiAgICBvcGVyYWNpb24uY29kaWdvICAgICAgPSBvYmpldG9bXCJDT0RJR09cIl07XHJcbiAgICBvcGVyYWNpb24uZGVzY3JpcGNpb24gPSBvYmpldG9bXCJERVNDUklQQ0lPTlwiXTtcclxuICAgIHJldHVybiBvcGVyYWNpb247XHJcbiAgfVxyXG5cclxuXHJcbiAgdmVyaWZpY2FUcngoZW5jcnlwdGVkU2VjdWVuY2lhLCBvcmlnZW4sIHRpcG9PcGVyYWNpb24sIGN0YURlYml0b0VuY3JpcHRhZGEsIGN1ZW50YURlUGFnbywgXHJcbiAgICAgIG1vbnRvUGFnYXIsIHByb3Bvc2l0b1BhZ28sIG51bUN0YVRDRW5jcmlwdGFkYSwgY2F0ZWdvcmlhLCBzZXJ2aWNpb1xyXG4gICAgKSB7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9WRVJJRklDQV9UUlhgO1xyXG4gICAgbGV0IGhlYWRlcnMgPSBIdHRwVXRpbHMuY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKTtcclxuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VDVUVOQ0lBJywgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUE9SSUdFTicsIG9yaWdlbik7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BUSVBPX09QRVJBQ0lPTicsIHRpcG9PcGVyYWNpb24pO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQQ0QnLCBjdGFEZWJpdG9FbmNyaXB0YWRhKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUENQJywgY3VlbnRhRGVQYWdvKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUE1PTlRPJywgbW9udG9QYWdhcik7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BQUk9QT1NJVE8nLCBwcm9wb3NpdG9QYWdvKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUENUQV9UQycsIG51bUN0YVRDRW5jcmlwdGFkYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BDQVRFR09SSUEnLCBjYXRlZ29yaWEpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VSVklDSU8nLCBzZXJ2aWNpbyk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlxcblwiLHVybCxcIlxcblwiKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnXFxuUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUE9SSUdFTicsIG9yaWdlbik7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUFRJUE9fT1BFUkFDSU9OJywgdGlwb09wZXJhY2lvbik7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUENEJywgY3RhRGViaXRvRW5jcmlwdGFkYSk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUENQJywgY3VlbnRhRGVQYWdvKTtcclxuICAgIGNvbnNvbGUubG9nKCdcXG5QTU9OVE8nLCBtb250b1BhZ2FyKTtcclxuICAgIGNvbnNvbGUubG9nKCdcXG5QUFJPUE9TSVRPJywgcHJvcG9zaXRvUGFnbyk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUENUQV9UQycsIG51bUN0YVRDRW5jcmlwdGFkYSk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUENBVEVHT1JJQScsIGNhdGVnb3JpYSk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUFNFUlZJQ0lPJywgc2VydmljaW8pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7IFxyXG4gICAgICBjb25zb2xlLmxvZyhcInZlcmlmaWNhVHJ4XCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgcmVzcHVlc3RhIDogV3NSZXNwdWVzdGFUcnhQYWdvID0gdGhpcy50cmFuc2Zvcm1hUmVzcHVlc3RhKHJlcyk7XHJcbiAgICAgIHJldHVybiByZXNwdWVzdGE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtYVJlc3B1ZXN0YShyZXM6T2JqZWN0KSA6IFdzUmVzcHVlc3RhVHJ4UGFnbyB7XHJcbiAgICBsZXQgcmVzcHVlc3RhIDogV3NSZXNwdWVzdGFUcnhQYWdvID0gbmV3IFdzUmVzcHVlc3RhVHJ4UGFnbygpO1xyXG4gICAgcmVzcHVlc3RhLmNvZGlnbyAgPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl1bXCJQUkVTUF9DT0RcIl07XHJcbiAgICByZXNwdWVzdGEubWVuc2FqZSA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXVtcIlBNRU5TQUpFXCJdO1xyXG4gICAgcmVzcHVlc3RhLnRva2VuICAgPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl1bXCJQVE9LRU5cIl07XHJcbiAgICByZXR1cm4gcmVzcHVlc3RhO1xyXG4gIH1cclxuXHJcbiAgcmVhbGl6YVRyeChlbmNyeXB0ZWRTZWN1ZW5jaWEsIG9yaWdlbiwgdGlwb09wZXJhY2lvbiwgY3RhRGViaXRvRW5jcmlwdGFkYSwgY3VlbnRhRGVQYWdvLCBcclxuICAgIG1vbnRvUGFnYXIsIHByb3Bvc2l0b1BhZ28sIG51bUN0YVRDRW5jcmlwdGFkYSwgY2F0ZWdvcmlhLCBzZXJ2aWNpbywgdG9rZW5cclxuICApIHtcclxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L1JFQUxJWkFfVFJYYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BPUklHRU4nLCBvcmlnZW4pO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQVElQT19PUEVSQUNJT04nLCB0aXBvT3BlcmFjaW9uKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUENEJywgY3RhRGViaXRvRW5jcmlwdGFkYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BDUCcsIGN1ZW50YURlUGFnbyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BNT05UTycsIG1vbnRvUGFnYXIpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQUFJPUE9TSVRPJywgcHJvcG9zaXRvUGFnbyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BUT0tFTicsIHRva2VuKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUENUQV9UQycsIG51bUN0YVRDRW5jcmlwdGFkYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BDQVRFR09SSUEnLCBjYXRlZ29yaWEpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VSVklDSU8nLCBzZXJ2aWNpbyk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlxcblwiLHVybCxcIlxcblwiKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnXFxuUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUE9SSUdFTicsIG9yaWdlbik7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUFRJUE9fT1BFUkFDSU9OJywgdGlwb09wZXJhY2lvbik7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUENEJywgY3RhRGViaXRvRW5jcmlwdGFkYSk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUENQJywgY3VlbnRhRGVQYWdvKTtcclxuICAgIGNvbnNvbGUubG9nKCdcXG5QTU9OVE8nLCBtb250b1BhZ2FyKTtcclxuICAgIGNvbnNvbGUubG9nKCdcXG5QUFJPUE9TSVRPJywgcHJvcG9zaXRvUGFnbyk7XHJcbiAgICBjb25zb2xlLmxvZygnXFxuUFRPS0VOJywgdG9rZW4pO1xyXG4gICAgY29uc29sZS5sb2coJ1xcblBDVEFfVEMnLCBudW1DdGFUQ0VuY3JpcHRhZGEpO1xyXG4gICAgY29uc29sZS5sb2coJ1xcblBDQVRFR09SSUEnLCBjYXRlZ29yaWEpO1xyXG4gICAgY29uc29sZS5sb2coJ1xcblBTRVJWSUNJTycsIHNlcnZpY2lvKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBmb3JtRGF0YSwge2hlYWRlcnM6aGVhZGVycyxyZXNwb25zZVR5cGU6XCJqc29uXCJ9KVxyXG4gICAgLm1hcCggKHJlcykgPT4geyBcclxuICAgICAgY29uc29sZS5sb2coXCJyZWFsaXphVHJ4XCIsIEpTT04uc3RyaW5naWZ5KHJlcykpOyBcclxuICAgICAgbGV0IHJlc3B1ZXN0YSA6IFdzUmVzcHVlc3RhVHJ4UGFnbyA9IHRoaXMudHJhbnNmb3JtYVJlc3B1ZXN0YShyZXMpO1xyXG4gICAgICByZXR1cm4gcmVzcHVlc3RhO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBTb2xpY2l0YSB0cmFuc2FjY2lvbmVzIGZhdm9yaXRhcyBkZSB0YXJqZXRhc1xyXG4gIHNvbGljaXRhVHJ4c0Zhdm9yaXRhc1RqdGFzKGVuY3J5cHRlZFNlY3VlbmNpYSl7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9HRVRfVENfRkFWYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBjb25zb2xlLmxvZyh1cmwsIFwiXFxuXCIsIGZvcm1EYXRhKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJTZWN1ZW5jaWE6XCIsZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7IFxyXG4gICAgICBjb25zb2xlLmxvZyhcInNvbGljaXRhRmF2b3JpdGFzXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgZmF2b3JpdGFzIDogVHJ4RmF2b3JpdGFUanRhW10gPSB0aGlzLnRyYW5zZm9ybWFGYXZvcml0YXNUanRhcyhyZXMpO1xyXG4gICAgICByZXR1cm4gZmF2b3JpdGFzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFGYXZvcml0YXNUanRhcyhyZXMpIDogVHJ4RmF2b3JpdGFUanRhW10ge1xyXG4gICAgbGV0IGFyclJlc3AgPSBbXTtcclxuICAgIGxldCBhcnIgOiBBcnJheTxhbnk+ID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICBhcnIuZm9yRWFjaCggKG9iamV0bykgPT4ge1xyXG4gICAgICAgIGFyclJlc3AucHVzaCh0aGlzLmNyZWFGYXZvcml0YVRqdGEob2JqZXRvKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyUmVzcC5wdXNoKHRoaXMuY3JlYUZhdm9yaXRhVGp0YShhcnIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJSZXNwOyBcclxuICB9XHJcbiBcclxuICBwcml2YXRlIGNyZWFGYXZvcml0YVRqdGEob2JqZXRvIDogT2JqZWN0KSAge1xyXG4gICAgbGV0IGZhdm9yaXRhIDogVHJ4RmF2b3JpdGFUanRhICA9IG5ldyBUcnhGYXZvcml0YVRqdGEoKTtcclxuICAgIGZhdm9yaXRhLnRpcG9PcGVyYWNpb24gPSBvYmpldG9bXCJUSVBPX09QRVJBQ0lPTlwiXTtcclxuICAgIGZhdm9yaXRhLmRlc2NyaXBjaW9uICAgPSBvYmpldG9bXCJERVNfVElQT19PUEVSQUNJT05cIl07XHJcbiAgICBmYXZvcml0YS5jdWVudGFEZWJpdG8gID0gb2JqZXRvW1wiQ1VFTlRBX0RFQklUT1wiXTtcclxuICAgIGZhdm9yaXRhLm51bVRhcmpldGEgICAgPSBvYmpldG9bXCJERVNUSU5PXCJdO1xyXG4gICAgZmF2b3JpdGEubW9udG8gICAgICAgICA9IG9iamV0b1tcIk1PTlRPXCJdO1xyXG4gICAgcmV0dXJuIGZhdm9yaXRhO1xyXG4gIH1cclxuXHJcbiAgLy8gU29saWNpdGEgdHJhbnNhY2Npb25lcyBmYXZvcml0YXMgZGUgcHJlc3RhbW9zXHJcbiAgc29saWNpdGFUcnhzRmF2b3JpdGFzUG1vcyhlbmNyeXB0ZWRTZWN1ZW5jaWEpe1xyXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IGAke3RoaXMuYmFzZVVybH0vR0VUX1BSX0ZBVmA7XHJcbiAgICBsZXQgaGVhZGVycyA9IEh0dHBVdGlscy5jcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BTRUNVRU5DSUEnLCBlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgY29uc29sZS5sb2codXJsLCBcIlxcblwiLCBmb3JtRGF0YSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiU2VjdWVuY2lhOlwiLGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBmb3JtRGF0YSwge2hlYWRlcnM6aGVhZGVycyxyZXNwb25zZVR5cGU6XCJqc29uXCJ9KVxyXG4gICAgLm1hcCggKHJlcykgPT4geyBcclxuICAgICAgY29uc29sZS5sb2coXCJzb2xpY2l0YVRyeHNGYXZvcml0YXNQbW9zXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgZmF2b3JpdGFzIDogV3NGYXZvcml0YXMgPSB0aGlzLnRyYW5zZm9ybWFGYXZvcml0YXNQbW9zKHJlcyk7XHJcbiAgICAgIHJldHVybiBmYXZvcml0YXM7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1hRmF2b3JpdGFzUG1vcyhyZXM6T2JqZWN0KSA6IFdzRmF2b3JpdGFzIHtcclxuICAgIGxldCB3c0RhdGEgOiBXc0Zhdm9yaXRhcyA9IG5ldyBXc0Zhdm9yaXRhcygpO1xyXG4gICAgbGV0IGZhdnMgOiBPYmplY3RbXSA9IFtdO1xyXG4gICAgaWYgKHJlc1tcIk5ld0RhdGFTZXRcIl0gIT0gbnVsbCkge1xyXG4gICAgICBsZXQgb2JqIDogQXJyYXk8YW55PiAgPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl07XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gYXJyYXkgKFZhcmlvcyByZWdpc3Ryb3MpLlxyXG4gICAgICAgIG9iai5mb3JFYWNoKCAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgZmF2cy5wdXNoKHRoaXMuY3JlYUZhdm9yaXRhUG1vKGVsZW1lbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvIChwdWVkZSBzZXIgdW5hIGZhdm9yaXRhIG8gdW4gbWVuc2FqZSkuXHJcbiAgICAgICAgaWYgKG9ialtcIlBSRVNQX0NPRFwiXSkge1xyXG4gICAgICAgICAgLy8gRXMgdW4gbWVuc2FqZVxyXG4gICAgICAgICAgd3NEYXRhLm1lbnNhamUgPSB0aGlzLmNyZWFSZXNwdWVzdGEob2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gRXMgdW5vIHNvbG8uXHJcbiAgICAgICAgICBmYXZzLnB1c2godGhpcy5jcmVhRmF2b3JpdGFQbW8ob2JqKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB3c0RhdGEubW92aW1pZW50b3MgPSBmYXZzO1xyXG4gICAgcmV0dXJuIHdzRGF0YTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYUZhdm9yaXRhUG1vKG9iamV0byA6IE9iamVjdCkge1xyXG4gICAgbGV0IGZhdm9yaXRhIDogVHJ4RmF2b3JpdGFQbW8gID0gbmV3IFRyeEZhdm9yaXRhUG1vKCk7XHJcbiAgICBmYXZvcml0YS50aXBvT3BlcmFjaW9uID0gb2JqZXRvW1wiVElQT19PUEVSQUNJT05cIl07XHJcbiAgICBmYXZvcml0YS5kZXNjcmlwY2lvbiAgID0gb2JqZXRvW1wiREVTX1RJUE9fT1BFUkFDSU9OXCJdO1xyXG4gICAgZmF2b3JpdGEuY3VlbnRhRGViaXRvICA9IG9iamV0b1tcIkNVRU5UQV9ERUJJVE9cIl07XHJcbiAgICBmYXZvcml0YS5udW1QcmVzdGFtbyAgID0gb2JqZXRvW1wiREVTVElOT1wiXTtcclxuICAgIGZhdm9yaXRhLm1vbnRvICAgICAgICAgPSBvYmpldG9bXCJNT05UT1wiXTtcclxuICAgIHJldHVybiBmYXZvcml0YTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYVJlc3B1ZXN0YShvYmpldG86T2JqZWN0KSA6IFdzUmVzcHVlc3RhIHtcclxuICAgIGxldCByZXNwdWVzdGEgOiBXc1Jlc3B1ZXN0YSA9IG5ldyBXc1Jlc3B1ZXN0YSgpO1xyXG4gICAgcmVzcHVlc3RhLmNvZGlnbyAgPSBvYmpldG9bXCJQUkVTUF9DT0RcIl07XHJcbiAgICByZXNwdWVzdGEubWVuc2FqZSA9IG9iamV0b1tcIlBNRU5TQUpFXCJdO1xyXG4gICAgcmV0dXJuIHJlc3B1ZXN0YTtcclxuICB9XHJcblxyXG4gIHNvbGljaXRhVHJ4c0Zhdm9yaXRhc1NlcnZzKGVuY3J5cHRlZFNlY3VlbmNpYSl7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9HRVRfU0VSVl9GQVZgO1xyXG4gICAgbGV0IGhlYWRlcnMgPSBIdHRwVXRpbHMuY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKTtcclxuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VDVUVOQ0lBJywgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIGNvbnNvbGUubG9nKHVybCwgXCJcXG5cIiwgZm9ybURhdGEpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIlNlY3VlbmNpYTpcIixlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic29saWNpdGFUcnhzRmF2b3JpdGFzU2VydnNcIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgIGxldCBmYXZvcml0YXMgOiBXc0Zhdm9yaXRhcyA9IHRoaXMudHJhbnNmb3JtYUZhdm9yaXRhc1NlcnZzKHJlcyk7XHJcbiAgICAgIHJldHVybiBmYXZvcml0YXM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtYUZhdm9yaXRhc1NlcnZzKHJlczpPYmplY3QpIDogV3NGYXZvcml0YXMge1xyXG4gICAgbGV0IHdzRGF0YSA6IFdzRmF2b3JpdGFzID0gbmV3IFdzRmF2b3JpdGFzKCk7XHJcbiAgICBsZXQgZmF2cyA6IE9iamVjdFtdID0gW107XHJcbiAgICBpZiAocmVzW1wiTmV3RGF0YVNldFwiXSAhPSBudWxsKSB7XHJcbiAgICAgIGxldCBvYmogOiBBcnJheTxhbnk+ICA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBhcnJheSAoVmFyaW9zIHJlZ2lzdHJvcykuXHJcbiAgICAgICAgb2JqLmZvckVhY2goIChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBmYXZzLnB1c2godGhpcy5jcmVhRmF2b3JpdGFTZXJ2KGVsZW1lbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvIChwdWVkZSBzZXIgdW5hIGZhdm9yaXRhIG8gdW4gbWVuc2FqZSkuXHJcbiAgICAgICAgaWYgKG9ialtcIlBSRVNQX0NPRFwiXSkge1xyXG4gICAgICAgICAgLy8gRXMgdW4gbWVuc2FqZVxyXG4gICAgICAgICAgd3NEYXRhLm1lbnNhamUgPSB0aGlzLmNyZWFSZXNwdWVzdGEob2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gRXMgdW5vIHNvbG8uXHJcbiAgICAgICAgICBmYXZzLnB1c2godGhpcy5jcmVhRmF2b3JpdGFTZXJ2KG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgd3NEYXRhLm1vdmltaWVudG9zID0gZmF2cztcclxuICAgIHJldHVybiB3c0RhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWFGYXZvcml0YVNlcnYob2JqZXRvIDogT2JqZWN0KSB7XHJcbiAgICBsZXQgZmF2b3JpdGEgOiBUcnhGYXZvcml0YVNlcnYgID0gbmV3IFRyeEZhdm9yaXRhU2VydigpO1xyXG4gICAgZmF2b3JpdGEudGlwb09wZXJhY2lvbiA9IG9iamV0b1tcIlRJUE9fT1BFUkFDSU9OXCJdO1xyXG4gICAgZmF2b3JpdGEuZGVzY1RpcG9PcGVyICA9IG9iamV0b1tcIkRFU19USVBPX09QRVJBQ0lPTlwiXTtcclxuICAgIGZhdm9yaXRhLmNhdGVnb3JpYSAgICAgPSBvYmpldG9bXCJDQVRFR09SSUFcIl07XHJcbiAgICBmYXZvcml0YS5kZXNjQ2F0ZWdvcmlhID0gb2JqZXRvW1wiREVTX0NBVEVHT1JJQVwiXTtcclxuICAgIGZhdm9yaXRhLnNlcnZpY2lvICAgICAgPSBvYmpldG9bXCJTRVJWSUNJT1wiXTtcclxuICAgIGZhdm9yaXRhLmRlc2NTZXJ2aWNpbyAgPSBvYmpldG9bXCJERVNfU0VSVklDSU9cIl07XHJcbiAgICBmYXZvcml0YS5jdWVudGFEZWJpdG8gID0gb2JqZXRvW1wiQ1VFTlRBX0RFQklUT1wiXTtcclxuICAgIGZhdm9yaXRhLmN1ZW50YURlc3Rpbm8gPSBvYmpldG9bXCJERVNUSU5PXCJdO1xyXG4gICAgZmF2b3JpdGEuZGVzY3JpcGNpb24gICA9IG9iamV0b1tcIkRFU0NSSVBDSU9OXCJdO1xyXG4gICAgZmF2b3JpdGEubW9udG8gICAgICAgICA9IG9iamV0b1tcIk1PTlRPXCJdO1xyXG4gICAgcmV0dXJuIGZhdm9yaXRhO1xyXG4gIH1cclxuXHJcblxyXG4gIHNvbGljaXRhckNhdGVnb3JpYXMoZW5jcnlwdGVkU2VjdWVuY2lhKXtcclxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L0dFVF9DQVRFR09SSUFgO1xyXG4gICAgbGV0IGhlYWRlcnMgPSBIdHRwVXRpbHMuY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKTtcclxuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VDVUVOQ0lBJywgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIGNvbnNvbGUubG9nKHVybCwgXCJcXG5cIiwgZm9ybURhdGEpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIlNlY3VlbmNpYTpcIixlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic29saWNpdGFyQ2F0ZWdvcmlhc1wiLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgbGV0IGNhdGVnb3JpYXMgOiBXc0NhdGVnb3JpYXMgPSB0aGlzLnRyYW5zZm9ybWFDYXRlZ29yaWFzKHJlcyk7XHJcbiAgICAgIHJldHVybiBjYXRlZ29yaWFzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFDYXRlZ29yaWFzKHJlczpPYmplY3QpIDogV3NDYXRlZ29yaWFzIHtcclxuICAgIGxldCB3c0RhdGEgOiBXc0NhdGVnb3JpYXMgPSBuZXcgV3NDYXRlZ29yaWFzKCk7XHJcbiAgICBsZXQgY2F0ZWdvcmlhcyA6IE9iamVjdFtdID0gW107XHJcbiAgICBpZiAocmVzW1wiTmV3RGF0YVNldFwiXSAhPSBudWxsKSB7XHJcbiAgICAgIGxldCBvYmogOiBBcnJheTxhbnk+ICA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBhcnJheSAoVmFyaW9zIHJlZ2lzdHJvcykuXHJcbiAgICAgICAgb2JqLmZvckVhY2goIChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBjYXRlZ29yaWFzLnB1c2godGhpcy5jcmVhQ2F0ZWdvcmlhKGVsZW1lbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvIChwdWVkZSBzZXIgdW4gbW92aW1pZW50byBvIHVuIG1lbnNhamUpLlxyXG4gICAgICAgIGlmIChvYmpbXCJQUkVTUF9DT0RcIl0pIHtcclxuICAgICAgICAgIC8vIEVzIHVuIG1lbnNhamVcclxuICAgICAgICAgIHdzRGF0YS5tZW5zYWplID0gdGhpcy5jcmVhUmVzcHVlc3RhKG9iaik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEVzIHVubyBzb2xvIG1vdnRvLlxyXG4gICAgICAgICAgY2F0ZWdvcmlhcy5wdXNoKHRoaXMuY3JlYUNhdGVnb3JpYShvYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHdzRGF0YS5tb3ZpbWllbnRvcyA9IGNhdGVnb3JpYXM7XHJcbiAgICByZXR1cm4gd3NEYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhQ2F0ZWdvcmlhKG9iamV0byA6IE9iamVjdCkge1xyXG4gICAgbGV0IGNhdGVnb3JpYSA6IENhdGVnb3JpYSAgPSBuZXcgQ2F0ZWdvcmlhKCk7XHJcbiAgICBjYXRlZ29yaWEuY29kaWdvICAgICAgPSBvYmpldG9bXCJDT0RJR09cIl07XHJcbiAgICBjYXRlZ29yaWEuZGVzY3JpcGNpb24gPSBvYmpldG9bXCJERVNDUklQQ0lPTlwiXTtcclxuICAgIHJldHVybiBjYXRlZ29yaWE7XHJcbiAgfVxyXG5cclxuXHJcbiAgc29saWNpdGFyU2VydmljaW9zKGVuY3J5cHRlZFNlY3VlbmNpYSxjb2RpZ29DYXRlZ29yaWEpe1xyXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IGAke3RoaXMuYmFzZVVybH0vR0VUX1NFUlZJQ0lPYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BDQVRFR09SSUEnLCBjb2RpZ29DYXRlZ29yaWEpO1xyXG4gICAgY29uc29sZS5sb2codXJsLCBcIlxcblwiLCBmb3JtRGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlBTRUNVRU5DSUEgLSBcIiwgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUENBVEVHT1JJQSAtIFwiLCBjb2RpZ29DYXRlZ29yaWEpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIlNlY3VlbmNpYTpcIixlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic29saWNpdGFyU2VydmljaW9zXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgc2VydmljaW9zIDogV3NTZXJ2aWNpb3MgPSB0aGlzLnRyYW5zZm9ybWFTZXJ2aWNpb3MocmVzKTtcclxuICAgICAgcmV0dXJuIHNlcnZpY2lvcztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1hU2VydmljaW9zKHJlczpPYmplY3QpIDogV3NTZXJ2aWNpb3Mge1xyXG4gICAgbGV0IHdzRGF0YSA6IFdzU2VydmljaW9zID0gbmV3IFdzU2VydmljaW9zKCk7XHJcbiAgICBsZXQgc2VydmljaW9zIDogT2JqZWN0W10gPSBbXTtcclxuICAgIGlmIChyZXNbXCJOZXdEYXRhU2V0XCJdICE9IG51bGwpIHtcclxuICAgICAgbGV0IG9iaiA6IEFycmF5PGFueT4gID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgLy8gTGEgcmVzcHVlc3RhIGVzIHVuIGFycmF5IChWYXJpb3MgcmVnaXN0cm9zKS5cclxuICAgICAgICBvYmouZm9yRWFjaCggKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIHNlcnZpY2lvcy5wdXNoKHRoaXMuY3JlYVNlcnZpY2lvKGVsZW1lbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvIChwdWVkZSBzZXIgdW4gbW92aW1pZW50byBvIHVuIG1lbnNhamUpLlxyXG4gICAgICAgIGlmIChvYmpbXCJQUkVTUF9DT0RcIl0pIHtcclxuICAgICAgICAgIC8vIEVzIHVuIG1lbnNhamVcclxuICAgICAgICAgIHdzRGF0YS5tZW5zYWplID0gdGhpcy5jcmVhUmVzcHVlc3RhKG9iaik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEVzIHVubyBzb2xvIG1vdnRvLlxyXG4gICAgICAgICAgc2VydmljaW9zLnB1c2godGhpcy5jcmVhU2VydmljaW8ob2JqKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB3c0RhdGEubW92aW1pZW50b3MgPSBzZXJ2aWNpb3M7XHJcbiAgICByZXR1cm4gd3NEYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhU2VydmljaW8ob2JqZXRvIDogT2JqZWN0KSB7XHJcbiAgICBsZXQgc2VydmljaW8gOiBTZXJ2aWNpbyAgPSBuZXcgU2VydmljaW8oKTtcclxuICAgIHNlcnZpY2lvLmNvZGlnbyAgICAgID0gb2JqZXRvW1wiQ09ESUdPXCJdO1xyXG4gICAgc2VydmljaW8uZGVzY3JpcGNpb24gPSBvYmpldG9bXCJERVNDUklQQ0lPTlwiXTtcclxuICAgIHJldHVybiBzZXJ2aWNpbztcclxuICB9XHJcblxyXG5cclxuICBzb2xpY2l0YXJMYWJlbFNlcnZpY2lvKGVuY3J5cHRlZFNlY3VlbmNpYSxjb2RpZ29DYXRlZ29yaWEsY29kaWdvU2VydmljaW8pe1xyXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IGAke3RoaXMuYmFzZVVybH0vR0VUX0xBQkVMX1NFUlZJQ0lPYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BDQVRFR09SSUEnLCBjb2RpZ29DYXRlZ29yaWEpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VSVklDSU8nLCBjb2RpZ29TZXJ2aWNpbyk7XHJcbiAgICBjb25zb2xlLmxvZyh1cmwsIFwiXFxuXCIsIGZvcm1EYXRhKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJTZWN1ZW5jaWE6XCIsZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7IFxyXG4gICAgICBjb25zb2xlLmxvZyhcInNvbGljaXRhckxhYmVsU2VydmljaW9cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgIGxldCBsYWJlbCA6IFdzTGFiZWxTZXJ2aWNpbyA9IHRoaXMudHJhbnNmb3JtYUxhYmVsU2VydmljaW8ocmVzKTtcclxuICAgICAgcmV0dXJuIGxhYmVsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFMYWJlbFNlcnZpY2lvKHJlczpPYmplY3QpIDogV3NMYWJlbFNlcnZpY2lvIHtcclxuICAgIGxldCB3c0RhdGEgOiBXc0xhYmVsU2VydmljaW8gPSBuZXcgV3NMYWJlbFNlcnZpY2lvKCk7XHJcbiAgICBsZXQgbGFiZWwgOiBMYWJlbFNlcnZpY2lvO1xyXG4gICAgaWYgKHJlc1tcIk5ld0RhdGFTZXRcIl0gIT0gbnVsbCkge1xyXG4gICAgICBsZXQgb2JqIDogT2JqZWN0ID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdO1xyXG4gICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gb2JqZXRvIChwdWVkZSBzZXIgdW5hIGxhYmVsIG8gdW4gbWVuc2FqZSkuXHJcbiAgICAgIGlmIChvYmpbXCJQUkVTUF9DT0RcIl0pIHsgLy8gRXMgdW4gbWVuc2FqZVxyXG4gICAgICAgIHdzRGF0YS5tZW5zYWplID0gdGhpcy5jcmVhUmVzcHVlc3RhKG9iaik7XHJcbiAgICAgIH0gZWxzZSB7IC8vIEVzIHVuYSBsYWJlbC5cclxuICAgICAgICBsYWJlbCA9IHRoaXMuY3JlYUxhYmVsU2VydmljaW8ob2JqKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgd3NEYXRhLmxhYmVsID0gbGFiZWw7XHJcbiAgICByZXR1cm4gd3NEYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhTGFiZWxTZXJ2aWNpbyhvYmpldG8gOiBPYmplY3QpIHtcclxuICAgIGxldCBsYWJlbCA6IExhYmVsU2VydmljaW8gID0gbmV3IExhYmVsU2VydmljaW8oKTtcclxuICAgIGxhYmVsLmxhYmVsICAgICAgPSBvYmpldG9bXCJMQUJFTFwiXTtcclxuICAgIGxhYmVsLmxvbmdDdWVudGEgPSBvYmpldG9bXCJBQ0NPVU5UX0xFTkdUSFwiXTtcclxuICAgIHJldHVybiBsYWJlbDtcclxuICB9XHJcblxyXG5cclxufSJdfQ==