"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Plugins
//import { Encripta } from "nativescript-encripta";
// RSA Utils
var rsa_1 = require("../../shared/utils/rsa");
var Encriptador = /** @class */ (function () {
    function Encriptador() {
        this.encriptador = new rsa_1.RSAUtils();
    }
    Encriptador.prototype.generaRSAKey = function () {
        // Genera la llave pública y privada del dispositivo
        return this.encriptador.generaRSAKey();
    };
    Encriptador.prototype.pemToKey = function (pemKey) {
        return this.encriptador.pemToKey(pemKey);
    };
    Encriptador.prototype.extraePublicKey = function (rsaKeyPair) {
        // Extrae la llave pública del rsaKeyPair.
        return this.encriptador.base64ToPublicKey(rsaKeyPair);
    };
    Encriptador.prototype.extraePrivateKey = function (base64PrvKey) {
        return this.encriptador.base64ToPrivateKey(base64PrvKey);
    };
    Encriptador.prototype.base64ToPublicKey = function (base64PubKey) {
        return this.encriptador.base64ToPublicKey(base64PubKey);
    };
    Encriptador.prototype.descomponePubKey = function (rsaPublicKey) {
        return this.encriptador.descomponePubKey(rsaPublicKey);
    };
    Encriptador.prototype.encriptaRSA = function (clearText, rsaPubKey) {
        return this.encriptador.encriptaRSA(clearText, rsaPubKey);
    };
    Encriptador.prototype.desencriptaRSA = function (encryptedDataB64, rsaPrivKey) {
        return this.encriptador.desencriptaRSA(encryptedDataB64, rsaPrivKey);
    };
    Encriptador.prototype.privateKeyToBase64 = function (privateRSAKey) {
        return this.encriptador.privateKeyToBase64(privateRSAKey);
    };
    Encriptador.prototype.publicKeyToBase64 = function (publicRSAKey) {
        return this.encriptador.publicKeyToBase64(publicRSAKey);
    };
    Encriptador = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Encriptador);
    return Encriptador;
}());
exports.Encriptador = Encriptador;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcmlwdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbmNyaXB0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyxVQUFVO0FBQ1YsbURBQW1EO0FBRW5ELFlBQVk7QUFDWiw4Q0FBa0Q7QUFHbEQ7SUFJSTtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxjQUFRLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsa0NBQVksR0FBWjtRQUNJLG9EQUFvRDtRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLE1BQU07UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHFDQUFlLEdBQWYsVUFBZ0IsVUFBVTtRQUN0QiwwQ0FBMEM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixZQUFZO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCx1Q0FBaUIsR0FBakIsVUFBa0IsWUFBWTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLFlBQVk7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxTQUFTLEVBQUMsU0FBUztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxvQ0FBYyxHQUFkLFVBQWUsZ0JBQWdCLEVBQUMsVUFBVTtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELHdDQUFrQixHQUFsQixVQUFtQixhQUFhO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCx1Q0FBaUIsR0FBakIsVUFBa0IsWUFBWTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBaERRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTs7T0FDQSxXQUFXLENBaUR2QjtJQUFELGtCQUFDO0NBQUEsQUFqREQsSUFpREM7QUFqRFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8vIFBsdWdpbnNcclxuLy9pbXBvcnQgeyBFbmNyaXB0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZW5jcmlwdGFcIjtcclxuXHJcbi8vIFJTQSBVdGlsc1xyXG5pbXBvcnQgeyBSU0FVdGlscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXRpbHMvcnNhXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFbmNyaXB0YWRvciB7XHJcblxyXG4gICAgcHJpdmF0ZSBlbmNyaXB0YWRvcjogUlNBVXRpbHM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lbmNyaXB0YWRvciA9IG5ldyBSU0FVdGlscygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYVJTQUtleSgpIHtcclxuICAgICAgICAvLyBHZW5lcmEgbGEgbGxhdmUgcMO6YmxpY2EgeSBwcml2YWRhIGRlbCBkaXNwb3NpdGl2b1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuY3JpcHRhZG9yLmdlbmVyYVJTQUtleSgpXHJcbiAgICB9XHJcblxyXG4gICAgcGVtVG9LZXkocGVtS2V5KXtcclxuICAgICAgcmV0dXJuIHRoaXMuZW5jcmlwdGFkb3IucGVtVG9LZXkocGVtS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBleHRyYWVQdWJsaWNLZXkocnNhS2V5UGFpcil7XHJcbiAgICAgICAgLy8gRXh0cmFlIGxhIGxsYXZlIHDDumJsaWNhIGRlbCByc2FLZXlQYWlyLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmVuY3JpcHRhZG9yLmJhc2U2NFRvUHVibGljS2V5KHJzYUtleVBhaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4dHJhZVByaXZhdGVLZXkoYmFzZTY0UHJ2S2V5KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmNyaXB0YWRvci5iYXNlNjRUb1ByaXZhdGVLZXkoYmFzZTY0UHJ2S2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBiYXNlNjRUb1B1YmxpY0tleShiYXNlNjRQdWJLZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmNyaXB0YWRvci5iYXNlNjRUb1B1YmxpY0tleShiYXNlNjRQdWJLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NvbXBvbmVQdWJLZXkocnNhUHVibGljS2V5KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmNyaXB0YWRvci5kZXNjb21wb25lUHViS2V5KHJzYVB1YmxpY0tleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5jcmlwdGFSU0EoY2xlYXJUZXh0LHJzYVB1YktleSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jcmlwdGFkb3IuZW5jcmlwdGFSU0EoY2xlYXJUZXh0LHJzYVB1YktleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzZW5jcmlwdGFSU0EoZW5jcnlwdGVkRGF0YUI2NCxyc2FQcml2S2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jcmlwdGFkb3IuZGVzZW5jcmlwdGFSU0EoZW5jcnlwdGVkRGF0YUI2NCxyc2FQcml2S2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlS2V5VG9CYXNlNjQocHJpdmF0ZVJTQUtleSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jcmlwdGFkb3IucHJpdmF0ZUtleVRvQmFzZTY0KHByaXZhdGVSU0FLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpY0tleVRvQmFzZTY0KHB1YmxpY1JTQUtleSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jcmlwdGFkb3IucHVibGljS2V5VG9CYXNlNjQocHVibGljUlNBS2V5KTtcclxuICAgIH1cclxufVxyXG4iXX0=