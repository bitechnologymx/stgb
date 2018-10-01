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
var ValidaTokenService = /** @class */ (function () {
    function ValidaTokenService(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    ValidaTokenService.prototype.validarTokenStatus = function (encryptedSecuencia, clienteEncriptado) {
        var _this = this;
        var url = this.baseUrl + "/VALIDATE_TOKEN_STATUS";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PUSER', clienteEncriptado);
        //console.log(url, "\n", "PSECUENCIA:", encryptedSecuencia, "\n", "PUSER:", clienteEncriptado);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            //console.log("validarTokenStatus", JSON.stringify(res));
            var respuesta = _this.transformaRespuesta(res);
            return respuesta;
        });
    };
    ValidaTokenService.prototype.transformaRespuesta = function (res) {
        var respuesta = new WsRespuesta();
        respuesta.codigo = res["NewDataSet"]["Table"]["PRESP_COD"];
        respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
        return respuesta;
    };
    ValidaTokenService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ValidaTokenService);
    return ValidaTokenService;
}());
exports.ValidaTokenService = ValidaTokenService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhLXRva2VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGEtdG9rZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBa0Q7QUFFbEQseURBQXVEO0FBRXZEO0lBQUE7SUFHQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLGtDQUFXO0FBTXhCO0lBS0UsNEJBQW9CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7UUFIN0IsWUFBTyxHQUFZLHNCQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFJaEQsQ0FBQztJQUVELCtDQUFrQixHQUFsQixVQUFtQixrQkFBa0IsRUFBQyxpQkFBaUI7UUFBdkQsaUJBYUM7UUFaQyxJQUFJLEdBQUcsR0FBZSxJQUFJLENBQUMsT0FBTywyQkFBd0IsQ0FBQztRQUMzRCxJQUFJLE9BQU8sR0FBRyxzQkFBUyxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDNUMsK0ZBQStGO1FBQy9GLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLENBQUM7YUFDMUUsR0FBRyxDQUFFLFVBQUMsR0FBRztZQUNSLHlEQUF5RDtZQUN6RCxJQUFJLFNBQVMsR0FBaUIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sZ0RBQW1CLEdBQTNCLFVBQTRCLEdBQVU7UUFDcEMsSUFBSSxTQUFTLEdBQWlCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDaEQsU0FBUyxDQUFDLE1BQU0sR0FBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsU0FBUyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBNUJVLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQU1nQixpQkFBVTtPQUwxQixrQkFBa0IsQ0ErQjlCO0lBQUQseUJBQUM7Q0FBQSxBQS9CRCxJQStCQztBQS9CWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5cclxuaW1wb3J0IHsgSHR0cFV0aWxzIH0gZnJvbSBcIi4uL3NoYXJlZC91dGlscy9odHRwLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV3NSZXNwdWVzdGEge1xyXG4gICAgY29kaWdvIDogc3RyaW5nO1xyXG4gICAgbWVuc2FqZSA6IHN0cmluZztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhVG9rZW5TZXJ2aWNlIHtcclxuIFxyXG4gIHByaXZhdGUgYmFzZVVybCA6IHN0cmluZyA9IEh0dHBVdGlscy5nZXRXc1VybCgpOyBcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cCA6IEh0dHBDbGllbnQpIHsgXHJcbiAgfVxyXG5cclxuICB2YWxpZGFyVG9rZW5TdGF0dXMoZW5jcnlwdGVkU2VjdWVuY2lhLGNsaWVudGVFbmNyaXB0YWRvKSB7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9WQUxJREFURV9UT0tFTl9TVEFUVVNgO1xyXG4gICAgbGV0IGhlYWRlcnMgPSBIdHRwVXRpbHMuY3JlYXRlUmVxdWVzdEhlYWRlclBvc3QoKTtcclxuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQU0VDVUVOQ0lBJywgZW5jcnlwdGVkU2VjdWVuY2lhKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFVTRVInLCBjbGllbnRlRW5jcmlwdGFkbyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHVybCwgXCJcXG5cIiwgXCJQU0VDVUVOQ0lBOlwiLCBlbmNyeXB0ZWRTZWN1ZW5jaWEsIFwiXFxuXCIsIFwiUFVTRVI6XCIsIGNsaWVudGVFbmNyaXB0YWRvKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7IFxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwidmFsaWRhclRva2VuU3RhdHVzXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICBsZXQgcmVzcHVlc3RhIDogV3NSZXNwdWVzdGEgPSB0aGlzLnRyYW5zZm9ybWFSZXNwdWVzdGEocmVzKTtcclxuICAgICAgcmV0dXJuIHJlc3B1ZXN0YTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1hUmVzcHVlc3RhKHJlczpPYmplY3QpIDogV3NSZXNwdWVzdGEge1xyXG4gICAgbGV0IHJlc3B1ZXN0YSA6IFdzUmVzcHVlc3RhID0gbmV3IFdzUmVzcHVlc3RhKCk7XHJcbiAgICByZXNwdWVzdGEuY29kaWdvICA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXVtcIlBSRVNQX0NPRFwiXTtcclxuICAgIHJlc3B1ZXN0YS5tZW5zYWplID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdW1wiUE1FTlNBSkVcIl07XHJcbiAgICByZXR1cm4gcmVzcHVlc3RhO1xyXG4gIH1cclxuXHJcblxyXG59Il19