"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
var http_utils_1 = require("../shared/utils/http-utils");
var cuentas_iterface_1 = require("../services/interfaces/cuentas.iterface");
var cuenta_movtos_interface_1 = require("../services/interfaces/cuenta-movtos.interface");
var respuesta_interface_1 = require("../services/interfaces/respuesta.interface");
var WsData = /** @class */ (function () {
    function WsData() {
    }
    return WsData;
}());
exports.WsData = WsData;
var CuentasService = /** @class */ (function () {
    function CuentasService(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    CuentasService.prototype.obtenerCuentas = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_CC";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        console.log(formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("obtenerCuentas", JSON.stringify(res));
            var cuentas = _this.transformaCuentas(res);
            return cuentas;
        });
    };
    CuentasService.prototype.transformaCuentas = function (res) {
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
    CuentasService.prototype.creaCuenta = function (objeto) {
        var cuenta = new cuentas_iterface_1.Cuenta();
        cuenta.numTarjeta = objeto["NUM_TARJETA"];
        cuenta.numCuenta = objeto["NUM_CUENTA"];
        cuenta.titular = objeto["TITULAR"];
        cuenta.status = objeto["ESTADO_CTA"];
        cuenta.moneda = objeto["VMONEDA"];
        cuenta.saldoActual = objeto["SALDO_ACTUAL"];
        cuenta.pseudonimo = objeto["PSEUDONIMO"];
        cuenta.saldoTotal = objeto["SAL_TOTAL_CTA"];
        return cuenta;
    };
    CuentasService.prototype.obtenerMovtosCuenta = function (encryptedSecuencia, encryptedCuenta, min, max) {
        var _this = this;
        var url = this.baseUrl + "/GET_CC_MOV";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PNUM_CUENTA', encryptedCuenta);
        formData.append('PCANT_MIN', min.toString());
        formData.append('PCANT_MAX', max.toString());
        console.log(url, "\n", encryptedSecuencia, encryptedCuenta, min, max);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            console.log("obtenerMovtosCuenta", JSON.stringify(res));
            var wsData = _this.transformMovtosCuenta(res);
            return wsData;
        });
    };
    CuentasService.prototype.transformMovtosCuenta = function (res) {
        var _this = this;
        var wsData = new WsData();
        var movtos = [];
        if (res["NewDataSet"] != null) {
            var obj = res["NewDataSet"]["Table"];
            if (Array.isArray(obj)) {
                // La respuesta es un array (Varios movimientos).
                obj.forEach(function (element) {
                    movtos.push(_this.creaMovto(element));
                });
            }
            else {
                // La respuesta es un objeto (puede ser un movto o un mensaje, hazme el favor!!!??).
                if (obj["PRESP_COD"]) {
                    // Es un mensaje
                    wsData.mensaje = this.creaRespuesta(obj);
                }
                else {
                    // Es un solo movto.
                    movtos.push(this.creaMovto(obj));
                }
            }
        }
        wsData.movimientos = movtos;
        return wsData;
    };
    CuentasService.prototype.creaMovto = function (objeto) {
        var movto = new cuenta_movtos_interface_1.MovtoCuenta();
        movto.fecha = objeto["FEC_MOVIMIENTO"];
        movto.descripcion = objeto["DESCRIPCION"];
        movto.monto = objeto["MON_MOVIMIENTO"];
        movto.saldo = objeto["VSALDO"];
        return movto;
    };
    CuentasService.prototype.creaRespuesta = function (objeto) {
        var respuesta = new respuesta_interface_1.WsRespuesta();
        respuesta.codigo = objeto["PRESP_COD"];
        respuesta.mensaje = objeto["PMENSAJE"];
        return respuesta;
    };
    CuentasService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CuentasService);
    return CuentasService;
}());
exports.CuentasService = CuentasService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VlbnRhcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VlbnRhcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUFrRDtBQUNsRCxpQ0FBK0I7QUFFL0IseURBQXVEO0FBRXZELDRFQUFpRTtBQUNqRSwwRkFBNkU7QUFDN0Usa0ZBQXlFO0FBRXpFO0lBQUE7SUFHQSxDQUFDO0lBQUQsYUFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksd0JBQU07QUFNbkI7SUFLRSx3QkFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUg3QixZQUFPLEdBQVksc0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUloRCxDQUFDO0lBRUQsdUNBQWMsR0FBZCxVQUFlLGtCQUFrQjtRQUFqQyxpQkFZQztRQVhDLElBQUksR0FBRyxHQUFlLElBQUksQ0FBQyxPQUFPLFlBQVMsQ0FBQztRQUM1QyxJQUFJLE9BQU8sR0FBRyxzQkFBUyxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsQ0FBQzthQUMxRSxHQUFHLENBQUUsVUFBQyxHQUFHO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxPQUFPLEdBQWMsS0FBSSxDQUFDLGlCQUFpQixDQUFD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O1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxrQ0FBUyxHQUFqQixVQUFrQixNQUFlO1FBQy9CLElBQUksS0FBSyxHQUFlLElBQUkscUNBQVcsRUFBRSxDQUFDO1FBQzFDLEtBQUssQ0FBQyxLQUFLLEdBQVMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLEtBQUssR0FBUyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsS0FBSyxHQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLHNDQUFhLEdBQXJCLFVBQXNCLE1BQWE7UUFDakMsSUFBSSxTQUFTLEdBQWlCLElBQUksaUNBQVcsRUFBRSxDQUFDO1FBQ2hELFNBQVMsQ0FBQyxNQUFNLEdBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQTNHVSxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBTWdCLGlCQUFVO09BTDFCLGNBQWMsQ0E2RzFCO0lBQUQscUJBQUM7Q0FBQSxBQTdHRCxJQTZHQztBQTdHWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5cclxuaW1wb3J0IHsgSHR0cFV0aWxzIH0gZnJvbSBcIi4uL3NoYXJlZC91dGlscy9odHRwLXV0aWxzXCI7XHJcblxyXG5pbXBvcnQgeyBDdWVudGEgfSBmcm9tIFwiLi4vc2VydmljZXMvaW50ZXJmYWNlcy9jdWVudGFzLml0ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1vdnRvQ3VlbnRhIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2ludGVyZmFjZXMvY3VlbnRhLW1vdnRvcy5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV3NSZXNwdWVzdGEgfSBmcm9tIFwiLi4vc2VydmljZXMvaW50ZXJmYWNlcy9yZXNwdWVzdGEuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV3NEYXRhIHtcclxuICBtZW5zYWplIDogV3NSZXNwdWVzdGE7XHJcbiAgbW92aW1pZW50b3MgOiBNb3Z0b0N1ZW50YVtdO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDdWVudGFzU2VydmljZSB7XHJcbiBcclxuICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmcgPSBIdHRwVXRpbHMuZ2V0V3NVcmwoKTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cCA6IEh0dHBDbGllbnQpIHsgXHJcbiAgfVxyXG5cclxuICBvYnRlbmVyQ3VlbnRhcyhlbmNyeXB0ZWRTZWN1ZW5jaWEpIHtcclxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L0dFVF9DQ2A7XHJcbiAgICBsZXQgaGVhZGVycyA9IEh0dHBVdGlscy5jcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BTRUNVRU5DSUEnLCBlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgY29uc29sZS5sb2coZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwib2J0ZW5lckN1ZW50YXNcIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgIGxldCBjdWVudGFzIDogQ3VlbnRhW10gPSB0aGlzLnRyYW5zZm9ybWFDdWVudGFzKHJlcyk7XHJcbiAgICAgIHJldHVybiBjdWVudGFzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFDdWVudGFzKHJlczpPYmplY3QpOkN1ZW50YVtde1xyXG4gICAgbGV0IGN1ZW50YXMgPSBbXTtcclxuICAgIGxldCBhcnIgOiBBcnJheTxhbnk+ID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAvLyBMYSByZXNwdWVzdGEgZXMgdW4gYXJyYXkgKFZhcmlhcyBjdWVudGFzKS5cclxuICAgICAgYXJyLmZvckVhY2goIChvYmpldG8pID0+IHtcclxuICAgICAgICBjdWVudGFzLnB1c2godGhpcy5jcmVhQ3VlbnRhKG9iamV0bykpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBvYmpldG8gKHVuYSBzb2xhIGN1ZW50YSkuXHJcbiAgICAgIGN1ZW50YXMucHVzaCh0aGlzLmNyZWFDdWVudGEoYXJyKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VlbnRhcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYUN1ZW50YShvYmpldG8gOiBPYmplY3QpIDogQ3VlbnRhIHtcclxuICAgIGxldCBjdWVudGE6Q3VlbnRhID0gbmV3IEN1ZW50YSgpO1xyXG4gICAgY3VlbnRhLm51bVRhcmpldGEgICAgICA9IG9iamV0b1tcIk5VTV9UQVJKRVRBXCJdO1xyXG4gICAgY3VlbnRhLm51bUN1ZW50YSAgICAgICA9IG9iamV0b1tcIk5VTV9DVUVOVEFcIl07XHJcbiAgICBjdWVudGEudGl0dWxhciAgICAgICAgID0gb2JqZXRvW1wiVElUVUxBUlwiXTtcclxuICAgIGN1ZW50YS5zdGF0dXMgICAgICAgICAgPSBvYmpldG9bXCJFU1RBRE9fQ1RBXCJdO1xyXG4gICAgY3VlbnRhLm1vbmVkYSAgICAgICAgICA9IG9iamV0b1tcIlZNT05FREFcIl07XHJcbiAgICBjdWVudGEuc2FsZG9BY3R1YWwgICAgID0gb2JqZXRvW1wiU0FMRE9fQUNUVUFMXCJdO1xyXG4gICAgY3VlbnRhLnBzZXVkb25pbW8gICAgICA9IG9iamV0b1tcIlBTRVVET05JTU9cIl07XHJcbiAgICBjdWVudGEuc2FsZG9Ub3RhbCAgICAgID0gb2JqZXRvW1wiU0FMX1RPVEFMX0NUQVwiXTtcclxuICAgIHJldHVybiBjdWVudGE7XHJcbiAgfVxyXG5cclxuXHJcbiAgb2J0ZW5lck1vdnRvc0N1ZW50YShlbmNyeXB0ZWRTZWN1ZW5jaWE6IGFueSwgZW5jcnlwdGVkQ3VlbnRhOiBhbnksIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcil7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9HRVRfQ0NfTU9WYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFNFQ1VFTkNJQScsIGVuY3J5cHRlZFNlY3VlbmNpYSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BOVU1fQ1VFTlRBJywgZW5jcnlwdGVkQ3VlbnRhKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUENBTlRfTUlOJywgbWluLnRvU3RyaW5nKCkpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQQ0FOVF9NQVgnLCBtYXgudG9TdHJpbmcoKSk7XHJcbiAgICBjb25zb2xlLmxvZyh1cmwsIFwiXFxuXCIsIGVuY3J5cHRlZFNlY3VlbmNpYSwgZW5jcnlwdGVkQ3VlbnRhLCBtaW4sIG1heCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBmb3JtRGF0YSwge2hlYWRlcnM6aGVhZGVycyxyZXNwb25zZVR5cGU6XCJqc29uXCJ9KVxyXG4gICAgLm1hcCggKHJlcykgPT4geyBcclxuICAgICAgY29uc29sZS5sb2coXCJvYnRlbmVyTW92dG9zQ3VlbnRhXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgd3NEYXRhIDogV3NEYXRhID0gdGhpcy50cmFuc2Zvcm1Nb3Z0b3NDdWVudGEocmVzKTtcclxuICAgICAgcmV0dXJuIHdzRGF0YTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1Nb3Z0b3NDdWVudGEocmVzOk9iamVjdCkgOiBXc0RhdGEge1xyXG4gICAgbGV0IHdzRGF0YSA6IFdzRGF0YSA9IG5ldyBXc0RhdGEoKTtcclxuICAgIGxldCBtb3Z0b3MgPSBbXTtcclxuICAgIGlmIChyZXNbXCJOZXdEYXRhU2V0XCJdICE9IG51bGwpIHtcclxuICAgICAgbGV0IG9iaiA6IEFycmF5PGFueT4gID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgLy8gTGEgcmVzcHVlc3RhIGVzIHVuIGFycmF5IChWYXJpb3MgbW92aW1pZW50b3MpLlxyXG4gICAgICAgIG9iai5mb3JFYWNoKCAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgbW92dG9zLnB1c2godGhpcy5jcmVhTW92dG8oZWxlbWVudCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIExhIHJlc3B1ZXN0YSBlcyB1biBvYmpldG8gKHB1ZWRlIHNlciB1biBtb3Z0byBvIHVuIG1lbnNhamUsIGhhem1lIGVsIGZhdm9yISEhPz8pLlxyXG4gICAgICAgIGlmIChvYmpbXCJQUkVTUF9DT0RcIl0pIHtcclxuICAgICAgICAgIC8vIEVzIHVuIG1lbnNhamVcclxuICAgICAgICAgIHdzRGF0YS5tZW5zYWplID0gdGhpcy5jcmVhUmVzcHVlc3RhKG9iaik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEVzIHVuIHNvbG8gbW92dG8uXHJcbiAgICAgICAgICBtb3Z0b3MucHVzaCh0aGlzLmNyZWFNb3Z0byhvYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHdzRGF0YS5tb3ZpbWllbnRvcyA9IG1vdnRvcztcclxuICAgIHJldHVybiB3c0RhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWFNb3Z0byhvYmpldG8gOiBPYmplY3QpIDogTW92dG9DdWVudGEge1xyXG4gICAgbGV0IG1vdnRvOk1vdnRvQ3VlbnRhID0gbmV3IE1vdnRvQ3VlbnRhKCk7XHJcbiAgICBtb3Z0by5mZWNoYSAgICAgICA9IG9iamV0b1tcIkZFQ19NT1ZJTUlFTlRPXCJdO1xyXG4gICAgbW92dG8uZGVzY3JpcGNpb24gPSBvYmpldG9bXCJERVNDUklQQ0lPTlwiXTtcclxuICAgIG1vdnRvLm1vbnRvICAgICAgID0gb2JqZXRvW1wiTU9OX01PVklNSUVOVE9cIl07XHJcbiAgICBtb3Z0by5zYWxkbyAgICAgICA9IG9iamV0b1tcIlZTQUxET1wiXTtcclxuICAgIHJldHVybiBtb3Z0bztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYVJlc3B1ZXN0YShvYmpldG86T2JqZWN0KSA6IFdzUmVzcHVlc3RhIHtcclxuICAgIGxldCByZXNwdWVzdGEgOiBXc1Jlc3B1ZXN0YSA9IG5ldyBXc1Jlc3B1ZXN0YSgpO1xyXG4gICAgcmVzcHVlc3RhLmNvZGlnbyAgPSBvYmpldG9bXCJQUkVTUF9DT0RcIl07XHJcbiAgICByZXNwdWVzdGEubWVuc2FqZSA9IG9iamV0b1tcIlBNRU5TQUpFXCJdO1xyXG4gICAgcmV0dXJuIHJlc3B1ZXN0YTtcclxuICB9XHJcblxyXG59Il19