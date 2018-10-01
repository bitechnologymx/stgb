"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
var http_utils_1 = require("../shared/utils/http-utils");
var respuesta_interface_1 = require("../services/interfaces/respuesta.interface");
var Contacto = /** @class */ (function () {
    function Contacto(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    Contacto.prototype.contacto = function (encryptedSecuencia, usrEmail, usrPhone, usrMessage) {
        var _this = this;
        var url = this.baseUrl + "/CONTACTO";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PSECUENCIA', encryptedSecuencia);
        formData.append('PEMAIL', usrEmail);
        formData.append('PTELF', usrPhone);
        formData.append('PMSG', usrMessage);
        //console.log(url, "--",formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            //console.log("contacto", JSON.stringify(res));
            var respuesta = _this.transformaRespuesta(res);
            return respuesta;
        });
    };
    Contacto.prototype.transformaRespuesta = function (res) {
        var respuesta = new respuesta_interface_1.WsRespuesta();
        respuesta.codigo = res["NewDataSet"]["Table"]["PRESP_COD"];
        respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
        return respuesta;
    };
    Contacto = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], Contacto);
    return Contacto;
}());
exports.Contacto = Contacto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdG8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQWtEO0FBQ2xELGlDQUErQjtBQUUvQix5REFBdUQ7QUFDdkQsa0ZBQXlFO0FBR3pFO0lBSUUsa0JBQW9CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7UUFGN0IsWUFBTyxHQUFZLHNCQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFUCxDQUFDO0lBRTFDLDJCQUFRLEdBQVIsVUFBUyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVU7UUFBM0QsaUJBZUM7UUFkQyxJQUFJLEdBQUcsR0FBZSxJQUFJLENBQUMsT0FBTyxjQUFXLENBQUM7UUFDOUMsSUFBSSxPQUFPLEdBQUcsc0JBQVMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ2xELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBTSxRQUFRLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBTyxRQUFRLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBUSxVQUFVLENBQUMsQ0FBQztRQUMxQyxrQ0FBa0M7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsQ0FBQzthQUMxRSxHQUFHLENBQUUsVUFBQyxHQUFHO1lBQ1IsK0NBQStDO1lBQy9DLElBQUksU0FBUyxHQUFpQixLQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxzQ0FBbUIsR0FBM0IsVUFBNEIsR0FBVTtRQUNwQyxJQUFJLFNBQVMsR0FBaUIsSUFBSSxpQ0FBVyxFQUFFLENBQUM7UUFDaEQsU0FBUyxDQUFDLE1BQU0sR0FBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsU0FBUyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBNUJVLFFBQVE7UUFEcEIsaUJBQVUsRUFBRTt5Q0FLZ0IsaUJBQVU7T0FKMUIsUUFBUSxDQStCcEI7SUFBRCxlQUFDO0NBQUEsQUEvQkQsSUErQkM7QUEvQlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuXHJcbmltcG9ydCB7IEh0dHBVdGlscyB9IGZyb20gXCIuLi9zaGFyZWQvdXRpbHMvaHR0cC11dGlsc1wiO1xyXG5pbXBvcnQgeyBXc1Jlc3B1ZXN0YSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pbnRlcmZhY2VzL3Jlc3B1ZXN0YS5pbnRlcmZhY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbnRhY3RvIHtcclxuIFxyXG4gIHByaXZhdGUgYmFzZVVybCA6IHN0cmluZyA9IEh0dHBVdGlscy5nZXRXc1VybCgpOyBcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwIDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIGNvbnRhY3RvKGVuY3J5cHRlZFNlY3VlbmNpYSwgdXNyRW1haWwsIHVzclBob25lLCB1c3JNZXNzYWdlKSB7XHJcbiAgICBsZXQgdXJsIDogc3RyaW5nID0gYCR7dGhpcy5iYXNlVXJsfS9DT05UQUNUT2A7XHJcbiAgICBsZXQgaGVhZGVycyA9IEh0dHBVdGlscy5jcmVhdGVSZXF1ZXN0SGVhZGVyUG9zdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ1BTRUNVRU5DSUEnLCBlbmNyeXB0ZWRTZWN1ZW5jaWEpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQRU1BSUwnLCAgICAgdXNyRW1haWwpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQVEVMRicsICAgICAgdXNyUGhvbmUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdQTVNHJywgICAgICAgdXNyTWVzc2FnZSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHVybCwgXCItLVwiLGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczpoZWFkZXJzLHJlc3BvbnNlVHlwZTpcImpzb25cIn0pXHJcbiAgICAubWFwKCAocmVzKSA9PiB7IFxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY29udGFjdG9cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgIGxldCByZXNwdWVzdGEgOiBXc1Jlc3B1ZXN0YSA9IHRoaXMudHJhbnNmb3JtYVJlc3B1ZXN0YShyZXMpO1xyXG4gICAgICByZXR1cm4gcmVzcHVlc3RhO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWFSZXNwdWVzdGEocmVzOk9iamVjdCkgOiBXc1Jlc3B1ZXN0YSB7XHJcbiAgICBsZXQgcmVzcHVlc3RhIDogV3NSZXNwdWVzdGEgPSBuZXcgV3NSZXNwdWVzdGEoKTtcclxuICAgIHJlc3B1ZXN0YS5jb2RpZ28gID0gcmVzW1wiTmV3RGF0YVNldFwiXVtcIlRhYmxlXCJdW1wiUFJFU1BfQ09EXCJdO1xyXG4gICAgcmVzcHVlc3RhLm1lbnNhamUgPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl1bXCJQTUVOU0FKRVwiXTtcclxuICAgIHJldHVybiByZXNwdWVzdGE7XHJcbiAgfVxyXG5cclxuXHJcbn0iXX0=