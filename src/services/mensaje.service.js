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
var MensajeService = /** @class */ (function () {
    function MensajeService(http) {
        this.http = http;
        this.baseUrl = http_utils_1.HttpUtils.getWsUrl();
    }
    MensajeService.prototype.obtenerMensaje = function (codigo) {
        var _this = this;
        var url = this.baseUrl + "/GET_MENSAJE";
        var headers = http_utils_1.HttpUtils.createRequestHeaderPost();
        var formData = new FormData();
        formData.append('PRESP_COD', codigo);
        //console.log(url+"\n"+formData);
        return this.http.post(url, formData, { headers: headers, responseType: "json" })
            .map(function (res) {
            //console.log("obtenerMensaje", JSON.stringify(res));
            var respuesta = _this.transformaRespuesta(res);
            return respuesta;
        });
    };
    MensajeService.prototype.transformaRespuesta = function (res) {
        var respuesta = new WsRespuesta();
        respuesta.codigo = res["NewDataSet"]["Table"]["PRESP_COD"];
        respuesta.mensaje = res["NewDataSet"]["Table"]["PMENSAJE"];
        return respuesta;
    };
    MensajeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MensajeService);
    return MensajeService;
}());
exports.MensajeService = MensajeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVuc2FqZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVuc2FqZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUFrRDtBQUVsRCx5REFBdUQ7QUFFdkQ7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0NBQVc7QUFNeEI7SUFLRSx3QkFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUg3QixZQUFPLEdBQVksc0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUdQLENBQUM7SUFFMUMsdUNBQWMsR0FBZCxVQUFlLE1BQU07UUFBckIsaUJBWUM7UUFYQyxJQUFJLEdBQUcsR0FBZSxJQUFJLENBQUMsT0FBTyxpQkFBYyxDQUFDO1FBQ2pELElBQUksT0FBTyxHQUFHLHNCQUFTLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLGlDQUFpQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxDQUFDO2FBQzFFLEdBQUcsQ0FBRSxVQUFDLEdBQUc7WUFDUixxREFBcUQ7WUFDckQsSUFBSSxTQUFTLEdBQWlCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDRDQUFtQixHQUEzQixVQUE0QixHQUFVO1FBQ3BDLElBQUksU0FBUyxHQUFpQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2hELFNBQVMsQ0FBQyxNQUFNLEdBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELFNBQVMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQTFCVSxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBTWdCLGlCQUFVO09BTDFCLGNBQWMsQ0E2QjFCO0lBQUQscUJBQUM7Q0FBQSxBQTdCRCxJQTZCQztBQTdCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcblxyXG5pbXBvcnQgeyBIdHRwVXRpbHMgfSBmcm9tIFwiLi4vc2hhcmVkL3V0aWxzL2h0dHAtdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXc1Jlc3B1ZXN0YSB7XHJcbiAgICBjb2RpZ28gOiBzdHJpbmc7XHJcbiAgICBtZW5zYWplIDogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNZW5zYWplU2VydmljZSB7XHJcbiBcclxuICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmcgPSBIdHRwVXRpbHMuZ2V0V3NVcmwoKTsgXHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHAgOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgb2J0ZW5lck1lbnNhamUoY29kaWdvKXtcclxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBgJHt0aGlzLmJhc2VVcmx9L0dFVF9NRU5TQUpFYDtcclxuICAgIGxldCBoZWFkZXJzID0gSHR0cFV0aWxzLmNyZWF0ZVJlcXVlc3RIZWFkZXJQb3N0KCk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnUFJFU1BfQ09EJywgY29kaWdvKTtcclxuICAgIC8vY29uc29sZS5sb2codXJsK1wiXFxuXCIrZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtoZWFkZXJzOmhlYWRlcnMscmVzcG9uc2VUeXBlOlwianNvblwifSlcclxuICAgIC5tYXAoIChyZXMpID0+IHsgXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJvYnRlbmVyTWVuc2FqZVwiLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgbGV0IHJlc3B1ZXN0YSA6IFdzUmVzcHVlc3RhID0gdGhpcy50cmFuc2Zvcm1hUmVzcHVlc3RhKHJlcyk7XHJcbiAgICAgIHJldHVybiByZXNwdWVzdGE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtYVJlc3B1ZXN0YShyZXM6T2JqZWN0KSA6IFdzUmVzcHVlc3RhIHtcclxuICAgIGxldCByZXNwdWVzdGEgOiBXc1Jlc3B1ZXN0YSA9IG5ldyBXc1Jlc3B1ZXN0YSgpO1xyXG4gICAgcmVzcHVlc3RhLmNvZGlnbyAgPSByZXNbXCJOZXdEYXRhU2V0XCJdW1wiVGFibGVcIl1bXCJQUkVTUF9DT0RcIl07XHJcbiAgICByZXNwdWVzdGEubWVuc2FqZSA9IHJlc1tcIk5ld0RhdGFTZXRcIl1bXCJUYWJsZVwiXVtcIlBNRU5TQUpFXCJdO1xyXG4gICAgcmV0dXJuIHJlc3B1ZXN0YTtcclxuICB9XHJcblxyXG5cclxufSJdfQ==