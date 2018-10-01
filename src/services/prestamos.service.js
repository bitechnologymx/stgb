"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
var prestamo_iterface_1 = require("../services/interfaces/prestamo.iterface");
var http_utils_1 = require("../shared/utils/http-utils");
var PrestamoService = /** @class */ (function () {
    function PrestamoService(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    PrestamoService.prototype.obtenerPrestamos = function (encryptedSecuencia) {
        var _this = this;
        var url = this.baseUrl + "/GET_PR";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        //console.log(url, "-", formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            //console.log("obtenerPrestamos", JSON.stringify(res)); 
            var prestamos = _this.transformaRespuesta(res);
            return prestamos;
        });
    };
    PrestamoService.prototype.transformaRespuesta = function (res) {
        var _this = this;
        var prestamos = [];
        var arr = res["NewDataSet"]["Table"];
        if (Array.isArray(arr)) {
            // La respuesta es un array (Varios préstamos).
            arr.forEach(function (objeto) {
                prestamos.push(_this.creaPrestamo(objeto));
            });
        }
        else {
            // La respuesta es un objeto (un solo préstamo).
            prestamos.push(this.creaPrestamo(arr));
        }
        return prestamos;
    };
    PrestamoService.prototype.creaPrestamo = function (objeto) {
        var prestamo = new prestamo_iterface_1.Prestamo();
        prestamo.numCredito = objeto["NO_CREDITO"];
        prestamo.pseudonimo = objeto["PSEUDONIMO"];
        prestamo.descripcion = objeto["DESCRIPCION"];
        prestamo.saldo = objeto["SALDO"];
        prestamo.montoDesembolsado = objeto["MONTO_DESEMBOLSADO"];
        prestamo.fechaProxPago = objeto["PROX_PAGO"];
        prestamo.cuota = objeto["CUOTA"];
        //console.log("Apodo:", prestamo.pseudonimo);
        return prestamo;
    };
    PrestamoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PrestamoService);
    return PrestamoService;
}());
exports.PrestamoService = PrestamoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc3RhbW9zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVzdGFtb3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBa0Q7QUFDbEQsaUNBQStCO0FBRS9CLDhFQUFvRTtBQUNwRSx5REFBdUQ7QUFHdkQ7SUFJRSx5QkFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUY3QixZQUFPLEdBQVksc0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUdoRCxDQUFDO0lBRUQsMENBQWdCLEdBQWhCLFVBQWlCLGtCQUFrQjtRQUFuQyxpQkFZQztRQVhDLElBQUksR0FBRyxHQUFlLElBQUksQ0FBQyxPQUFPLFlBQVMsQ0FBQztRQUM1QyxJQUFJLE9BQU8sR0FBRyxzQkFBUyxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xELGtDQUFrQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxDQUFDO2FBQzFFLEdBQUcsQ0FBRSxVQUFDLEdBQUc7WUFDUix3REFBd0Q7WUFDeEQsSUFBSSxTQUFTLEdBQWdCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDZDQUFtQixHQUEzQixVQUE0QixHQUFVO1FBQXRDLGlCQWFDO1FBWkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFnQixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsK0NBQStDO1lBQy9DLEdBQUcsQ0FBQyxPQUFPLENBQUUsVUFBQyxNQUFNO2dCQUNsQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGdEQUFnRDtZQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU8sc0NBQVksR0FBcEIsVUFBcUIsTUFBZTtRQUNsQyxJQUFJLFFBQVEsR0FBaUIsSUFBSSw0QkFBUSxFQUFFLENBQUM7UUFDNUMsUUFBUSxDQUFDLFVBQVUsR0FBVSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsUUFBUSxDQUFDLFVBQVUsR0FBVSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsUUFBUSxDQUFDLFdBQVcsR0FBUyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsUUFBUSxDQUFDLEtBQUssR0FBZSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFELFFBQVEsQ0FBQyxhQUFhLEdBQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxLQUFLLEdBQWUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLDZDQUE2QztRQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUEvQ1UsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUtnQixpQkFBVTtPQUoxQixlQUFlLENBaUQzQjtJQUFELHNCQUFDO0NBQUEsQUFqREQsSUFpREM7QUFqRFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuXHJcbmltcG9ydCB7IFByZXN0YW1vIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2ludGVyZmFjZXMvcHJlc3RhbW8uaXRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSHR0cFV0aWxzIH0gZnJvbSBcIi4uL3NoYXJlZC91dGlscy9odHRwLXV0aWxzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcmVzdGFtb1NlcnZpY2Uge1xyXG4gXHJcbiAgcHJpdmF0ZSBiYXNlVXJsIDogc3RyaW5nID0gSHR0cFV0aWxzLmdldFdzVXJsKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cCA6IEh0dHBDbGllbnQpIHsgXHJcbiAgfVxyXG5cclxuICBvYnRlbmVyUHJlc3RhbW9zKGVuY3J5cHRlZFNlY3VlbmNpYSl7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9HRVRfUFJgO1xyXG4gICAgbGV0IGhlYWRlcnMgPSBIdHRwVXRpbHMuY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKTtcclxuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VDVUVOQ0lBJywgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIC8vY29uc29sZS5sb2codXJsLCBcIi1cIiwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJvYnRlbmVyUHJlc3RhbW9zXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpOyBcclxuICAgICAgbGV0IHByZXN0YW1vcyA6IFByZXN0YW1vW10gPSB0aGlzLnRyYW5zZm9ybWFSZXNwdWVzdGEocmVzKTtcclxuICAgICAgcmV0dXJuIHByZXN0YW1vcztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1hUmVzcHVlc3RhKHJlczpPYmplY3QpIDogUHJlc3RhbW9bXSB7XHJcbiAgICBsZXQgcHJlc3RhbW9zID0gW107XHJcbiAgICBsZXQgYXJyIDogQXJyYXk8YW55PiA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcclxuICAgICAgLy8gTGEgcmVzcHVlc3RhIGVzIHVuIGFycmF5IChWYXJpb3MgcHLDqXN0YW1vcykuXHJcbiAgICAgIGFyci5mb3JFYWNoKCAob2JqZXRvKSA9PiB7XHJcbiAgICAgICAgcHJlc3RhbW9zLnB1c2godGhpcy5jcmVhUHJlc3RhbW8ob2JqZXRvKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTGEgcmVzcHVlc3RhIGVzIHVuIG9iamV0byAodW4gc29sbyBwcsOpc3RhbW8pLlxyXG4gICAgICBwcmVzdGFtb3MucHVzaCh0aGlzLmNyZWFQcmVzdGFtbyhhcnIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmVzdGFtb3M7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWFQcmVzdGFtbyhvYmpldG8gOiBPYmplY3QpIDogUHJlc3RhbW8ge1xyXG4gICAgbGV0IHByZXN0YW1vIDogUHJlc3RhbW8gICAgPSBuZXcgUHJlc3RhbW8oKTtcclxuICAgIHByZXN0YW1vLm51bUNyZWRpdG8gICAgICAgID0gb2JqZXRvW1wiTk9fQ1JFRElUT1wiXTtcclxuICAgIHByZXN0YW1vLnBzZXVkb25pbW8gICAgICAgID0gb2JqZXRvW1wiUFNFVURPTklNT1wiXTtcclxuICAgIHByZXN0YW1vLmRlc2NyaXBjaW9uICAgICAgID0gb2JqZXRvW1wiREVTQ1JJUENJT05cIl07XHJcbiAgICBwcmVzdGFtby5zYWxkbyAgICAgICAgICAgICA9IG9iamV0b1tcIlNBTERPXCJdO1xyXG4gICAgcHJlc3RhbW8ubW9udG9EZXNlbWJvbHNhZG8gPSBvYmpldG9bXCJNT05UT19ERVNFTUJPTFNBRE9cIl07XHJcbiAgICBwcmVzdGFtby5mZWNoYVByb3hQYWdvICAgICA9IG9iamV0b1tcIlBST1hfUEFHT1wiXTtcclxuICAgIHByZXN0YW1vLmN1b3RhICAgICAgICAgICAgID0gb2JqZXRvW1wiQ1VPVEFcIl07XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiQXBvZG86XCIsIHByZXN0YW1vLnBzZXVkb25pbW8pO1xyXG4gICAgcmV0dXJuIHByZXN0YW1vO1xyXG4gIH1cclxuXHJcbn0iXX0=