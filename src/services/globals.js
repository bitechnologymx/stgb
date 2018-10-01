"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppGlobals = /** @class */ (function () {
    function AppGlobals() {
        this.STORAGE_KEY = "SRSA_KEY";
        this.WS_PUBLIC_KEY = "SWS_PUBLIC_KEY";
        this.RSA_KEY_PAIR = "SRSA_KEY_PAIR";
        this.RSA_PUBLIC_KEY = "SRSA_PUBLIC_KEY";
        this.RSA_PUBLIC_MODULUS_KEY = "SRSA_PUBLIC_M_KEY";
        this.RSA_PUBLIC_EXPONENT_KEY = "SRSA_PUBLIC_E_KEY";
        this.RSA_PRIVATE_KEY = "SRSA_PRIVATE_KEY";
        this.usrName = "";
        this.usrPwd = "";
        this.bankUsrName = "";
        this.ultIngreso = "";
        this.bankUsrCIF = "";
        this.tipoCuentas = {
            numCuentas: 0,
            numTarjetas: 0,
            numPrestamos: 0,
            hubActivo: null
        };
        /*
         Se decide guardar mejor la secuencia encriptada, 9/Ago/2018; cuando se hayan modificado
         todos los servicios que involucran la secuencia por secuencia encriptada, se procederá
         a eliminar el campo ultSecuencia.
         */
        this.ultSecuenciaEncriptada = null;
        this.ultHash = "";
        this.callCenterNum = "+507 270-5000";
        this.callCenterNumiOS = "+507-270-5000";
        this.wsGenericErrMsg = "Banca Móvil en mantenimiento, por favor inténte más tarde.";
        this.contactoSubject = "Contacto por Banca Móvil";
        this.contactoSender = "info@stgeorgesbank.com";
        this.contactoEmails = ["r2ferna@gmail.com", "fernando.rodriguez@Bitechnology.com.mx"];
        //public contactoEmails : Array<string> = ["servicioalcliente@stgeorgesbank.com", "belbancaenlinea@stgeorgesbank.com"];
        this.contactoCC = ["info@stgeorgesbank.com"];
        this.sessionTimeOut = 300000; // (5 min)(60 seg/min)(1000 ms/seg) = 300,000 ms
        this.sessionTimeOutCheck = 60000; // (1 min)(60 seg/min)(1000 ms/seg) = 60,000 ms
        this.noInternetConectionMsg = "Por favor, verifique su conexión a internet.";
        this.ipDispositivo = "";
        this.timerIntervalo = null;
        this.opcionesCargadas = false;
        this.opciones = {
            cuentas: false,
            tarjetas: false,
            prestamos: false,
            transferencias: false,
            pagos: false,
            sucursales: true,
            ayuda: true,
            contacto: true,
            salida: true,
            hubActivo: true,
        };
    }
    AppGlobals.USR_NAME_KEY = "USR_NAME_KEY";
    AppGlobals.ULT_SECUENCIA_ENCRIPTADA_KEY = "ULT_SECUENCIA_ENCRIPTADA_KEY";
    AppGlobals = __decorate([
        core_1.Injectable()
    ], AppGlobals);
    return AppGlobals;
}());
exports.AppGlobals = AppGlobals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdsb2JhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFHMUM7SUFEQTtRQU9TLGdCQUFXLEdBQVcsVUFBVSxDQUFDO1FBQ2pDLGtCQUFhLEdBQVcsZ0JBQWdCLENBQUM7UUFDekMsaUJBQVksR0FBVyxlQUFlLENBQUM7UUFDdkMsbUJBQWMsR0FBVyxpQkFBaUIsQ0FBQztRQUMzQywyQkFBc0IsR0FBVyxtQkFBbUIsQ0FBQztRQUNyRCw0QkFBdUIsR0FBVyxtQkFBbUIsQ0FBQztRQUN0RCxvQkFBZSxHQUFXLGtCQUFrQixDQUFDO1FBTzdDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBRztZQUNuQixVQUFVLEVBQUUsQ0FBQztZQUNiLFdBQVcsRUFBRSxDQUFDO1lBQ2QsWUFBWSxFQUFFLENBQUM7WUFDZixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDO1FBUUY7Ozs7V0FJRztRQUNJLDJCQUFzQixHQUFRLElBQUksQ0FBQztRQUNuQyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLGtCQUFhLEdBQVcsZUFBZSxDQUFDO1FBQ3hDLHFCQUFnQixHQUFXLGVBQWUsQ0FBQztRQUMzQyxvQkFBZSxHQUFXLDREQUE0RCxDQUFDO1FBQ3ZGLG9CQUFlLEdBQVcsMEJBQTBCLENBQUM7UUFDckQsbUJBQWMsR0FBVyx3QkFBd0IsQ0FBQztRQUNsRCxtQkFBYyxHQUFrQixDQUFDLG1CQUFtQixFQUFFLHdDQUF3QyxDQUFDLENBQUM7UUFDdkcsdUhBQXVIO1FBQ2hILGVBQVUsR0FBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3ZELG1CQUFjLEdBQVcsTUFBTSxDQUFDLENBQUMsZ0RBQWdEO1FBQ2pGLHdCQUFtQixHQUFXLEtBQUssQ0FBQyxDQUFDLCtDQUErQztRQUNwRiwyQkFBc0IsR0FBVyw4Q0FBOEMsQ0FBQztRQUNoRixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixtQkFBYyxHQUFpQixJQUFJLENBQUM7UUFFcEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGFBQVEsR0FBRztZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLEtBQUs7WUFDaEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDO0lBQ0osQ0FBQztJQXZEZSx1QkFBWSxHQUFXLGNBQWMsQ0FBQztJQUN0Qyx1Q0FBNEIsR0FBVyw4QkFBOEIsQ0FBQztJQWpCekUsVUFBVTtRQUR0QixpQkFBVSxFQUFFO09BQ0EsVUFBVSxDQXVFdEI7SUFBRCxpQkFBQztDQUFBLEFBdkVELElBdUVDO0FBdkVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcHBHbG9iYWxzIHtcclxuXHJcbiAgcHVibGljIE5PREVfUlNBX1BSSVZBVEVfS0VZOiBhbnk7XHJcblxyXG4gIHB1YmxpYyBBQ1RJVkVfRFJBV0VSOiBhbnk7XHJcblxyXG4gIHB1YmxpYyBTVE9SQUdFX0tFWTogc3RyaW5nID0gXCJTUlNBX0tFWVwiO1xyXG4gIHB1YmxpYyBXU19QVUJMSUNfS0VZOiBzdHJpbmcgPSBcIlNXU19QVUJMSUNfS0VZXCI7XHJcbiAgcHVibGljIFJTQV9LRVlfUEFJUjogc3RyaW5nID0gXCJTUlNBX0tFWV9QQUlSXCI7XHJcbiAgcHVibGljIFJTQV9QVUJMSUNfS0VZOiBzdHJpbmcgPSBcIlNSU0FfUFVCTElDX0tFWVwiO1xyXG4gIHB1YmxpYyBSU0FfUFVCTElDX01PRFVMVVNfS0VZOiBzdHJpbmcgPSBcIlNSU0FfUFVCTElDX01fS0VZXCI7XHJcbiAgcHVibGljIFJTQV9QVUJMSUNfRVhQT05FTlRfS0VZOiBzdHJpbmcgPSBcIlNSU0FfUFVCTElDX0VfS0VZXCI7XHJcbiAgcHVibGljIFJTQV9QUklWQVRFX0tFWTogc3RyaW5nID0gXCJTUlNBX1BSSVZBVEVfS0VZXCI7XHJcblxyXG4gIHB1YmxpYyBSU0FfUFJJVkFURV9LRVlfT0JKOiBhbnk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgVVNSX05BTUVfS0VZOiBzdHJpbmcgPSBcIlVTUl9OQU1FX0tFWVwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgVUxUX1NFQ1VFTkNJQV9FTkNSSVBUQURBX0tFWTogc3RyaW5nID0gXCJVTFRfU0VDVUVOQ0lBX0VOQ1JJUFRBREFfS0VZXCI7XHJcblxyXG4gIHB1YmxpYyB1c3JOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHB1YmxpYyB1c3JQd2Q6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHVibGljIGJhbmtVc3JOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHB1YmxpYyB1bHRJbmdyZXNvOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHB1YmxpYyBiYW5rVXNyQ0lGOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHB1YmxpYyB0aXBvQ3VlbnRhcyA9IHtcclxuICAgIG51bUN1ZW50YXM6IDAsXHJcbiAgICBudW1UYXJqZXRhczogMCxcclxuICAgIG51bVByZXN0YW1vczogMCxcclxuICAgIGh1YkFjdGl2bzogbnVsbFxyXG4gIH07XHJcbiAgcHVibGljIHJzYUtleVBhaXI6IGFueTsgICAgIC8vIExsYXZlIFJTQSBnZW5lcmFkYSBwb3IgZWwgZGlzcG9zaXRpdm8gKFBhaXIpLlxyXG4gIHB1YmxpYyByc2FQdWJsaWNLZXk6IGFueTsgICAvLyBMbGF2ZSBww7pibGljYSBnZW5lcmFkYSBwb3IgZWwgZGlzcG9zaXRpdm8uXHJcbiAgcHVibGljIHJzYVB1YmxpY01vZHVsdXNLZXk6IGFueTsgICAvLyBMbGF2ZSBww7pibGljYSBtb2R1bHVzIGdlbmVyYWRhIHBvciBlbCBkaXNwb3NpdGl2by5cclxuICBwdWJsaWMgcnNhUHVibGljRXhwb25lbnRLZXk6IGFueTsgICAvLyBMbGF2ZSBww7pibGljYSBleHBvbmVudCBnZW5lcmFkYSBwb3IgZWwgZGlzcG9zaXRpdm8uXHJcbiAgcHVibGljIHJzYVByaXZhdGVLZXk6IGFueTsgIC8vIExsYXZlIHByaXZhZGEgZ2VuZXJhZGEgcG9yIGVsIGRpc3Bvc2l0aXZvLlxyXG4gIHB1YmxpYyB3c1B1YmxpY0tleTogYW55OyAgICAvLyBMbGF2ZSBww7pibGljYSBkZWwgV1MtQmFuY28uXHJcbiAgcHVibGljIHVsdFNlY3VlbmNpYTogYW55OyAgIC8vIFVsdGltYSBzZWN1ZW5jaWEgZW52aWFkYSBwb3IgZWwgQmFuY28uXHJcbiAgLypcclxuICAgU2UgZGVjaWRlIGd1YXJkYXIgbWVqb3IgbGEgc2VjdWVuY2lhIGVuY3JpcHRhZGEsIDkvQWdvLzIwMTg7IGN1YW5kbyBzZSBoYXlhbiBtb2RpZmljYWRvXHJcbiAgIHRvZG9zIGxvcyBzZXJ2aWNpb3MgcXVlIGludm9sdWNyYW4gbGEgc2VjdWVuY2lhIHBvciBzZWN1ZW5jaWEgZW5jcmlwdGFkYSwgc2UgcHJvY2VkZXLDoVxyXG4gICBhIGVsaW1pbmFyIGVsIGNhbXBvIHVsdFNlY3VlbmNpYS5cclxuICAgKi9cclxuICBwdWJsaWMgdWx0U2VjdWVuY2lhRW5jcmlwdGFkYTogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgdWx0SGFzaDogc3RyaW5nID0gXCJcIjtcclxuICBwdWJsaWMgY2FsbENlbnRlck51bTogc3RyaW5nID0gXCIrNTA3IDI3MC01MDAwXCI7XHJcbiAgcHVibGljIGNhbGxDZW50ZXJOdW1pT1M6IHN0cmluZyA9IFwiKzUwNy0yNzAtNTAwMFwiO1xyXG4gIHB1YmxpYyB3c0dlbmVyaWNFcnJNc2c6IHN0cmluZyA9IFwiQmFuY2EgTcOzdmlsIGVuIG1hbnRlbmltaWVudG8sIHBvciBmYXZvciBpbnTDqW50ZSBtw6FzIHRhcmRlLlwiO1xyXG4gIHB1YmxpYyBjb250YWN0b1N1YmplY3Q6IHN0cmluZyA9IFwiQ29udGFjdG8gcG9yIEJhbmNhIE3Ds3ZpbFwiO1xyXG4gIHB1YmxpYyBjb250YWN0b1NlbmRlcjogc3RyaW5nID0gXCJpbmZvQHN0Z2Vvcmdlc2JhbmsuY29tXCI7XHJcbiAgcHVibGljIGNvbnRhY3RvRW1haWxzOiBBcnJheTxzdHJpbmc+ID0gW1wicjJmZXJuYUBnbWFpbC5jb21cIiwgXCJmZXJuYW5kby5yb2RyaWd1ZXpAQml0ZWNobm9sb2d5LmNvbS5teFwiXTtcclxuICAvL3B1YmxpYyBjb250YWN0b0VtYWlscyA6IEFycmF5PHN0cmluZz4gPSBbXCJzZXJ2aWNpb2FsY2xpZW50ZUBzdGdlb3JnZXNiYW5rLmNvbVwiLCBcImJlbGJhbmNhZW5saW5lYUBzdGdlb3JnZXNiYW5rLmNvbVwiXTtcclxuICBwdWJsaWMgY29udGFjdG9DQzogQXJyYXk8c3RyaW5nPiA9IFtcImluZm9Ac3RnZW9yZ2VzYmFuay5jb21cIl07XHJcbiAgcHVibGljIHNlc3Npb25UaW1lT3V0OiBudW1iZXIgPSAzMDAwMDA7IC8vICg1IG1pbikoNjAgc2VnL21pbikoMTAwMCBtcy9zZWcpID0gMzAwLDAwMCBtc1xyXG4gIHB1YmxpYyBzZXNzaW9uVGltZU91dENoZWNrOiBudW1iZXIgPSA2MDAwMDsgLy8gKDEgbWluKSg2MCBzZWcvbWluKSgxMDAwIG1zL3NlZykgPSA2MCwwMDAgbXNcclxuICBwdWJsaWMgbm9JbnRlcm5ldENvbmVjdGlvbk1zZzogc3RyaW5nID0gXCJQb3IgZmF2b3IsIHZlcmlmaXF1ZSBzdSBjb25leGnDs24gYSBpbnRlcm5ldC5cIjtcclxuICBwdWJsaWMgaXBEaXNwb3NpdGl2bzogc3RyaW5nID0gXCJcIjtcclxuICBwdWJsaWMgdGltZXJJbnRlcnZhbG86IE5vZGVKUy5UaW1lciA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBvcGNpb25lc0NhcmdhZGFzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIG9wY2lvbmVzID0ge1xyXG4gICAgY3VlbnRhczogZmFsc2UsXHJcbiAgICB0YXJqZXRhczogZmFsc2UsXHJcbiAgICBwcmVzdGFtb3M6IGZhbHNlLFxyXG4gICAgdHJhbnNmZXJlbmNpYXM6IGZhbHNlLFxyXG4gICAgcGFnb3M6IGZhbHNlLFxyXG4gICAgc3VjdXJzYWxlczogdHJ1ZSxcclxuICAgIGF5dWRhOiB0cnVlLFxyXG4gICAgY29udGFjdG86IHRydWUsXHJcbiAgICBzYWxpZGE6IHRydWUsXHJcbiAgICBodWJBY3Rpdm86IHRydWUsXHJcbiAgfTtcclxufVxyXG4iXX0=