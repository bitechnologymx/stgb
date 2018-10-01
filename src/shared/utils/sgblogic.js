"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globals_1 = require("../../services/globals");
var SgbLogic = /** @class */ (function () {
    function SgbLogic(globVars) {
        this.globVars = globVars;
        this.codigo = {
            cuentas: 27,
            tarjetas: 28,
            prestamos: 29,
            transferencias: 30,
            pagos: 31
        };
        this.subOpcionPago = {
            tarjetas: false,
            prestamos: false,
            servicios: false,
        };
        this.codigoPago = {
            tarjetas: 35,
            prestamos: 36,
            servicios: 37,
        };
    }
    SgbLogic.prototype.opcionesOnOff = function () {
        console.log(".....................................");
        console.log(".....................................");
        console.log(" --NC " + this.globVars.tipoCuentas.numCuentas);
        this.globVars.opciones.cuentas = (this.globVars.tipoCuentas.numCuentas >= 1);
        console.log(" --OC " + this.globVars.opciones.cuentas);
        this.globVars.opciones.tarjetas = (this.globVars.tipoCuentas.numTarjetas >= 1);
        this.globVars.opciones.prestamos = (this.globVars.tipoCuentas.numPrestamos >= 1);
        this.globVars.opciones.transferencias = (this.globVars.tipoCuentas.numCuentas >= 1);
        this.globVars.opciones.pagos = (this.globVars.tipoCuentas.numCuentas >= 1 ||
            this.globVars.tipoCuentas.numTarjetas >= 1 ||
            this.globVars.tipoCuentas.numPrestamos >= 1);
        this.globVars.opciones.sucursales = true;
        this.globVars.opciones.ayuda = true;
        this.globVars.opciones.contacto = true;
        this.globVars.opciones.salida = true;
        this.globVars.opcionesCargadas = true;
    };
    SgbLogic.prototype.hayPermisoPara = function (opcion) {
        console.log(".....................................");
        console.log(".....................................");
        console.log(" --HPP " + this.globVars.opciones[opcion]);
        return this.globVars.opciones[opcion];
    };
    SgbLogic.prototype.subOpcionesPagosOnOff = function () {
        // Si tiene cuentas y tiene tarjetas --> puede pagar tarjetas.
        this.subOpcionPago.tarjetas = (this.globVars.opciones.cuentas && this.globVars.opciones.tarjetas);
        // Si tiene cuentas y tiene pr�stamos --> puede pagar pr�stamos.
        this.subOpcionPago.prestamos = (this.globVars.opciones.cuentas && this.globVars.opciones.prestamos);
        // Si tiene cuentas o tiene tarjetas con hub activo --> puede pagar servicios.
        this.subOpcionPago.servicios = (this.globVars.opciones.cuentas || (this.globVars.opciones.tarjetas && this.globVars.opciones.hubActivo));
    };
    SgbLogic.prototype.tipoPagoDefault = function () {
        if (this.globVars.opciones.cuentas && this.globVars.opciones.tarjetas && this.globVars.opciones.prestamos)
            return "Tarjetas";
        if (this.globVars.opciones.cuentas && this.globVars.opciones.tarjetas)
            return "Tarjetas";
        if (this.globVars.opciones.cuentas && this.globVars.opciones.prestamos)
            return "Prestamos";
        if (this.globVars.opciones.cuentas)
            return "Servicios";
        if (this.globVars.opciones.tarjetas && this.globVars.opciones.hubActivo)
            return "Servicios";
        return "";
    };
    SgbLogic.prototype.getCodigo = function (opcion) {
        return this.codigo[opcion];
    };
    SgbLogic.prototype.hayPermisoParaSubOpcionPago = function (subOpcion) {
        return this.subOpcionPago[subOpcion.toLowerCase()];
    };
    SgbLogic.prototype.getCodigoPago = function (tipoPago) {
        return this.codigoPago[tipoPago.toLowerCase()];
    };
    SgbLogic.prototype.origenPago = function () {
        return "3";
    };
    SgbLogic.prototype.tipoOperacionPago = function (tipoPago) {
        var tiposDePago = ["Prestamos", "Tarjetas", "Servicios"];
        return tiposDePago.indexOf(tipoPago) + 2;
    };
    SgbLogic.prototype.tipoOperacionPagoValida = function (operaciones, tipoPago) {
        for (var i = 0; i < operaciones.length; i++) {
            var element = operaciones[i];
            if (element.codigo == "3" && tipoPago == "Tarjetas")
                return true;
            if (element.codigo == "2" && tipoPago == "Prestamos")
                return true;
            if (element.codigo == "4" && tipoPago == "Servicios")
                return true;
        }
        return false;
    };
    SgbLogic = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [globals_1.AppGlobals])
    ], SgbLogic);
    return SgbLogic;
}());
exports.SgbLogic = SgbLogic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2dibG9naWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZ2Jsb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxrREFBb0Q7QUFHcEQ7SUFzQkksa0JBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFwQmhDLFdBQU0sR0FBRztZQUNiLE9BQU8sRUFBRyxFQUFFO1lBQ1osUUFBUSxFQUFHLEVBQUU7WUFDYixTQUFTLEVBQUcsRUFBRTtZQUNkLGNBQWMsRUFBRyxFQUFFO1lBQ25CLEtBQUssRUFBRyxFQUFFO1NBQ2IsQ0FBQTtRQUVJLGtCQUFhLEdBQUc7WUFDakIsUUFBUSxFQUFJLEtBQUs7WUFDakIsU0FBUyxFQUFHLEtBQUs7WUFDakIsU0FBUyxFQUFHLEtBQUs7U0FDcEIsQ0FBQTtRQUVPLGVBQVUsR0FBRztZQUNqQixRQUFRLEVBQUksRUFBRTtZQUNkLFNBQVMsRUFBRyxFQUFFO1lBQ2QsU0FBUyxFQUFHLEVBQUU7U0FDakIsQ0FBQTtJQUUwQyxDQUFDO0lBR3JDLGdDQUFhLEdBQXBCO1FBRUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMs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QUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSwwQ0FBdUIsR0FBOUIsVUFBK0IsV0FBVyxFQUFDLFFBQVE7UUFDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEMsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLElBQUksV0FBVyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BFLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUEzR1EsUUFBUTtRQURwQixpQkFBVSxFQUFFO3lDQXVCcUIsb0JBQVU7T0F0Qi9CLFFBQVEsQ0E2R3BCO0lBQUQsZUFBQztDQUFBLEFBN0dELElBNkdDO0FBN0dZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFwcEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ2xvYmFsc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2diTG9naWMge1xyXG5cclxuICAgIHByaXZhdGUgY29kaWdvID0ge1xyXG4gICAgICAgIGN1ZW50YXMgOiAyNyxcclxuICAgICAgICB0YXJqZXRhcyA6IDI4LFxyXG4gICAgICAgIHByZXN0YW1vcyA6IDI5LFxyXG4gICAgICAgIHRyYW5zZmVyZW5jaWFzIDogMzAsXHJcbiAgICAgICAgcGFnb3MgOiAzMVxyXG4gICAgfVxyXG5cclxuXHRwcml2YXRlIHN1Yk9wY2lvblBhZ28gPSB7XHJcbiAgICAgICAgdGFyamV0YXMgIDogZmFsc2UsXHJcbiAgICAgICAgcHJlc3RhbW9zIDogZmFsc2UsXHJcbiAgICAgICAgc2VydmljaW9zIDogZmFsc2UsXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb2RpZ29QYWdvID0ge1xyXG4gICAgICAgIHRhcmpldGFzICA6IDM1LFxyXG4gICAgICAgIHByZXN0YW1vcyA6IDM2LFxyXG4gICAgICAgIHNlcnZpY2lvcyA6IDM3LFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2xvYlZhcnM6IEFwcEdsb2JhbHMpIHt9XHJcblxyXG5cclxuICAgIHB1YmxpYyBvcGNpb25lc09uT2ZmKCl7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgLS1OQyBcIiArIHRoaXMuZ2xvYlZhcnMudGlwb0N1ZW50YXMubnVtQ3VlbnRhcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMuY3VlbnRhcyA9ICggdGhpcy5nbG9iVmFycy50aXBvQ3VlbnRhcy5udW1DdWVudGFzID49IDEgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgLS1PQyBcIiArIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMuY3VlbnRhcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMudGFyamV0YXMgPSAoIHRoaXMuZ2xvYlZhcnMudGlwb0N1ZW50YXMubnVtVGFyamV0YXMgPj0gMSApO1xyXG4gICAgICAgIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMucHJlc3RhbW9zID0gKCB0aGlzLmdsb2JWYXJzLnRpcG9DdWVudGFzLm51bVByZXN0YW1vcyA+PSAxICk7XHJcbiAgICAgICAgdGhpcy5nbG9iVmFycy5vcGNpb25lcy50cmFuc2ZlcmVuY2lhcyA9ICggdGhpcy5nbG9iVmFycy50aXBvQ3VlbnRhcy5udW1DdWVudGFzID49IDEgKTtcclxuICAgICAgICB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLnBhZ29zID0gKFxyXG4gICAgICAgICAgICB0aGlzLmdsb2JWYXJzLnRpcG9DdWVudGFzLm51bUN1ZW50YXMgPj0gMSB8fFxyXG4gICAgICAgICAgICB0aGlzLmdsb2JWYXJzLnRpcG9DdWVudGFzLm51bVRhcmpldGFzID49IDEgfHxcclxuICAgICAgICAgICAgdGhpcy5nbG9iVmFycy50aXBvQ3VlbnRhcy5udW1QcmVzdGFtb3MgPj0gMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5nbG9iVmFycy5vcGNpb25lcy5zdWN1cnNhbGVzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLmF5dWRhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLmNvbnRhY3RvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLnNhbGlkYSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXNDYXJnYWRhcyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhheVBlcm1pc29QYXJhKG9wY2lvbjpzdHJpbmcpe1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIC0tSFBQIFwiICsgdGhpcy5nbG9iVmFycy5vcGNpb25lc1tvcGNpb25dKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXNbb3BjaW9uXTtcclxuICAgICAgfVxyXG5cclxuXHRwdWJsaWMgc3ViT3BjaW9uZXNQYWdvc09uT2ZmKCl7XHJcbiAgICAgICAgLy8gU2kgdGllbmUgY3VlbnRhcyB5IHRpZW5lIHRhcmpldGFzIC0tPiBwdWVkZSBwYWdhciB0YXJqZXRhcy5cclxuICAgICAgICB0aGlzLnN1Yk9wY2lvblBhZ28udGFyamV0YXMgID0gKHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMuY3VlbnRhcyAmJiB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLnRhcmpldGFzKTtcclxuICAgICAgICAvLyBTaSB0aWVuZSBjdWVudGFzIHkgdGllbmUgcHLvv71zdGFtb3MgLS0+IHB1ZWRlIHBhZ2FyIHBy77+9c3RhbW9zLlxyXG4gICAgICAgIHRoaXMuc3ViT3BjaW9uUGFnby5wcmVzdGFtb3MgPSAodGhpcy5nbG9iVmFycy5vcGNpb25lcy5jdWVudGFzICYmIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMucHJlc3RhbW9zKTtcclxuICAgICAgICAvLyBTaSB0aWVuZSBjdWVudGFzIG8gdGllbmUgdGFyamV0YXMgY29uIGh1YiBhY3Rpdm8gLS0+IHB1ZWRlIHBhZ2FyIHNlcnZpY2lvcy5cclxuICAgICAgICB0aGlzLnN1Yk9wY2lvblBhZ28uc2VydmljaW9zID0gKHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMuY3VlbnRhcyB8fCAodGhpcy5nbG9iVmFycy5vcGNpb25lcy50YXJqZXRhcyAmJiB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLmh1YkFjdGl2bykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aXBvUGFnb0RlZmF1bHQoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMuY3VlbnRhcyAmJiB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLnRhcmpldGFzICYmIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMucHJlc3RhbW9zKSByZXR1cm4gXCJUYXJqZXRhc1wiO1xyXG4gICAgICAgIGlmICh0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLmN1ZW50YXMgJiYgdGhpcy5nbG9iVmFycy5vcGNpb25lcy50YXJqZXRhcykgcmV0dXJuIFwiVGFyamV0YXNcIjtcclxuICAgICAgICBpZiAodGhpcy5nbG9iVmFycy5vcGNpb25lcy5jdWVudGFzICYmIHRoaXMuZ2xvYlZhcnMub3BjaW9uZXMucHJlc3RhbW9zKSByZXR1cm4gXCJQcmVzdGFtb3NcIjtcclxuICAgICAgICBpZiAodGhpcy5nbG9iVmFycy5vcGNpb25lcy5jdWVudGFzKSByZXR1cm4gXCJTZXJ2aWNpb3NcIjtcclxuICAgICAgICBpZiAodGhpcy5nbG9iVmFycy5vcGNpb25lcy50YXJqZXRhcyAmJiB0aGlzLmdsb2JWYXJzLm9wY2lvbmVzLmh1YkFjdGl2bykgcmV0dXJuIFwiU2VydmljaW9zXCI7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29kaWdvKG9wY2lvbjpzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2RpZ29bb3BjaW9uXTtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGhheVBlcm1pc29QYXJhU3ViT3BjaW9uUGFnbyhzdWJPcGNpb246c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJPcGNpb25QYWdvW3N1Yk9wY2lvbi50b0xvd2VyQ2FzZSgpXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29kaWdvUGFnbyh0aXBvUGFnbzpzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2RpZ29QYWdvW3RpcG9QYWdvLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcmlnZW5QYWdvKCkge1xyXG4gICAgICAgIHJldHVybiBcIjNcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGlwb09wZXJhY2lvblBhZ28odGlwb1BhZ28pIHtcclxuICAgICAgICBsZXQgdGlwb3NEZVBhZ28gPSBbXCJQcmVzdGFtb3NcIiwgXCJUYXJqZXRhc1wiLCBcIlNlcnZpY2lvc1wiXTtcclxuICAgICAgICByZXR1cm4gdGlwb3NEZVBhZ28uaW5kZXhPZih0aXBvUGFnbykgKyAyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aXBvT3BlcmFjaW9uUGFnb1ZhbGlkYShvcGVyYWNpb25lcyx0aXBvUGFnbyl7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPG9wZXJhY2lvbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgZWxlbWVudCA9IG9wZXJhY2lvbmVzW2ldO1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQuY29kaWdvID09IFwiM1wiICYmIHRpcG9QYWdvID09IFwiVGFyamV0YXNcIikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudC5jb2RpZ28gPT0gXCIyXCIgJiYgdGlwb1BhZ28gPT0gXCJQcmVzdGFtb3NcIikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudC5jb2RpZ28gPT0gXCI0XCIgJiYgdGlwb1BhZ28gPT0gXCJTZXJ2aWNpb3NcIikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19