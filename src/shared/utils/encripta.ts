import { Injectable } from "@angular/core";

// Plugins
//import { Encripta } from "nativescript-encripta";

// RSA Utils
import { RSAUtils } from "../../shared/utils/rsa";

@Injectable()
export class Encriptador {

    private encriptador: RSAUtils;

    constructor() {
        this.encriptador = new RSAUtils();
    }

    generaRSAKey() {
        // Genera la llave pública y privada del dispositivo
        return this.encriptador.generaRSAKey()
    }

    pemToKey(pemKey){
      return this.encriptador.pemToKey(pemKey);
    }

    extraePublicKey(rsaKeyPair){
        // Extrae la llave pública del rsaKeyPair.
        return this.encriptador.base64ToPublicKey(rsaKeyPair);
    }

    extraePrivateKey(base64PrvKey){
        return this.encriptador.base64ToPrivateKey(base64PrvKey);
    }

    base64ToPublicKey(base64PubKey) {
        return this.encriptador.base64ToPublicKey(base64PubKey);
    }

    descomponePubKey(rsaPublicKey){
        return this.encriptador.descomponePubKey(rsaPublicKey);
    }

    encriptaRSA(clearText,rsaPubKey){
        return this.encriptador.encriptaRSA(clearText,rsaPubKey);
    }

    desencriptaRSA(encryptedDataB64,rsaPrivKey) {
        return this.encriptador.desencriptaRSA(encryptedDataB64,rsaPrivKey);
    }

    privateKeyToBase64(privateRSAKey){
        return this.encriptador.privateKeyToBase64(privateRSAKey);
    }

    publicKeyToBase64(publicRSAKey){
        return this.encriptador.publicKeyToBase64(publicRSAKey);
    }
}
