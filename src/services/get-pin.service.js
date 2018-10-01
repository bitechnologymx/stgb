"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var http_utils_1 = require("../shared/utils/http-utils");
var WsRespuesta = /** @class */ (function () {
    function WsRespuesta() {
    }
    return WsRespuesta;
}());
exports.WsRespuesta = WsRespuesta;
var GetPinService = /** @class */ (function () {
    function GetPinService(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    GetPinService.prototype.solicitarPin = function (encryptedSecuencia, token, numTarjeta, encryptedNumCuenta) {
        var _this = this;
        var url = this.baseUrl + "/GET_PIN";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PTOKEN', token);
        formData.append('PTARJETA', numTarjeta);
        formData.append('P_CUENTA', encryptedNumCuenta);
        //console.log(formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            //console.log("solicitarPin", JSON.stringify(res));
            var respuesta = _this.transformaRespuesta(res);
            return respuesta;
        });
    };
    GetPinService.prototype.transformaRespuesta = function (res) {
        var respuesta = new WsRespuesta();
        respuesta.codigo = res["NewDataSet"]["Table"]["PRESP_COD"];
        respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
        return respuesta;
    };
    GetPinService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], GetPinService);
    return GetPinService;
}());
exports.GetPinService = GetPinService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBpbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LXBpbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUFrRDtBQUVsRCx5REFBdUQ7QUFFdkQ7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0NBQVc7QUFNeEI7SUFLRSx1QkFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUg3QixZQUFPLEdBQVksc0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUloRCxDQUFDO0lBRUQsb0NBQVksR0FBWixVQUFhLGtCQUFrQixFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsa0JBQWtCO1FBQW5FLGlCQWVDO1FBZEMsSUFBSSxHQUFHLEdBQWUsSUFBSSxDQUFDLE9BQU8sYUFBVSxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLHNCQUFTLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsQ0FBQzthQUMxRSxHQUFHLENBQUUsVUFBQyxHQUFHO1lBQ1IsbURBQW1EO1lBQ25ELElBQUksU0FBUyxHQUFpQixLQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywyQ0FBbUIsR0FBM0IsVUFBNEIsR0FBVTtRQUNwQyxJQUFJLFNBQVMsR0FBaUIsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNoRCxTQUFTLENBQUMsTUFBTSxHQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1RCxTQUFTLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUE5QlUsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQU1nQixpQkFBVTtPQUwxQixhQUFhLENBaUN6QjtJQUFELG9CQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7QUFqQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5cclxuaW1wb3J0IHsgSHR0cFV0aWxzIH0gZnJvbSBcIi4uL3NoYXJlZC91dGlscy9odHRwLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV3NSZXNwdWVzdGEge1xyXG4gICAgY29kaWdvIDogc3RyaW5nO1xyXG4gICAgbWVuc2FqZSA6IHN0cmluZztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2V0UGluU2VydmljZSB7XHJcbiBcclxuICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmcgPSBIdHRwVXRpbHMuZ2V0V3NVcmwoKTsgXHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHAgOiBIdHRwQ2xpZW50KSB7IFxyXG4gIH1cclxuXHJcbiAgc29saWNpdGFyUGluKGVuY3J5cHRlZFNlY3VlbmNpYSx0b2tlbixudW1UYXJqZXRhLGVuY3J5cHRlZE51bUN1ZW50YSkge1xyXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IGAke3RoaXMuYmFzZVVybH0vR0VUX1BJTmA7XHJcbiAgICBsZXQgaGVhZGVycyA9IEh0dHBVdGlscy5jcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BTRUNVRU5DSUEnLCBlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQVE9LRU4nLCB0b2tlbik7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BUQVJKRVRBJywgbnVtVGFyamV0YSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BfQ1VFTlRBJywgZW5jcnlwdGVkTnVtQ3VlbnRhKTtcclxuICAgIC8vY29uc29sZS5sb2coZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJzb2xpY2l0YXJQaW5cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgIGxldCByZXNwdWVzdGEgOiBXc1Jlc3B1ZXN0YSA9IHRoaXMudHJhbnNmb3JtYVJlc3B1ZXN0YShyZXMpO1xyXG4gICAgICByZXR1cm4gcmVzcHVlc3RhO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFSZXNwdWVzdGEocmVzOk9iamVjdCkgOiBXc1Jlc3B1ZXN0YSB7XHJcbiAgICBsZXQgcmVzcHVlc3RhIDogV3NSZXNwdWVzdGEgPSBuZXcgV3NSZXNwdWVzdGEoKTtcclxuICAgIHJlc3B1ZXN0YS5jb2RpZ28gID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdW1wiUFJFU1BfQ09EXCJdO1xyXG4gICAgcmVzcHVlc3RhLm1lbnNhamUgPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl1bXCJQTUVOU0FKRVwiXTtcclxuICAgIHJldHVybiByZXNwdWVzdGE7XHJcbiAgfVxyXG5cclxuXHJcbn0iXX0=