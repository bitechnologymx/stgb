import * as rs from "jsrsasign";

export class RSAUtils {

  encriptaRSA(clearText, publicRSAKey /*: RSAKey*/) {
    let encript = rs.KJUR.crypto.Cipher.encrypt(clearText, publicRSAKey, "RSA");
    return rs.hextob64(encript); // no padding
  }

  desencriptaRSA(value, privateKey) {
    let decrypted = null;

    try {
      decrypted = privateKey.decrypt(value).toString();
    } catch (err) {
      console.log(err);
      return this.desencriptaRSAOld(value, privateKey.exportPemKey());
    }

    console.log("desencriptaRSA : " + value + " - " + decrypted);
    return decrypted;
  }

  desencriptaRSAOld(encryptedDataB64, privateRSAKey) {
    console.log("\ndesencriptaRSA - encryptedData:", encryptedDataB64);

    let encryptedDataHex = rs.b64tohex(encryptedDataB64);
    if (encryptedDataHex == null) { console.log("ES NULLLLL") }
    let decryptedDataHex = null;
    console.log("---------------------------------------------");
    console.log("desencriptaRSA - decryptedDataHex", decryptedDataHex);

    let i = 0;

    while (decryptedDataHex == null) {

      if (i == 0) { encryptedDataHex = rs.b64nltohex(encryptedDataB64); }
      if (i == 1) { encryptedDataHex = rs.b64utohex(encryptedDataB64); }
      if (i == 2) { encryptedDataHex = rs.b64tohex(encryptedDataB64); i = -1; }

      decryptedDataHex = rs.KJUR.crypto.Cipher.decrypt(encryptedDataHex, privateRSAKey, "RSA");
      console.log("desencriptaRSA - decryptedDataHex " + i + " : ", decryptedDataHex);

      if (decryptedDataHex == null && i == -1) {
        return null;
      }

      i = i + 1;
    }

    return decryptedDataHex;
  }

  /**desencriptaRSA(encryptedDataB64, privateRSAKey) {
        console.log("\ndesencriptaRSA - encryptedData:",encryptedDataB64);
        //console.log("privateRSAKey_B64", this.privateKeyToBase64(privateRSAKey));

        encryptedDataB64 = encryptedDataB64.trim();
        let privKeyB64 = this.privateKeyToBase64(privateRSAKey);
        let privateKey = this.base64ToPrivateKey(privKeyB64);
        let encryptedDataHex = rs.b64nltohex(encryptedDataB64);
        if (encryptedDataHex == null) {console.log("ES NULLLLL")}
        let decryptedDataHex = null;
        console.log("---------------------------------------------");
        console.log("desencriptaRSA - decryptedDataHex", decryptedDataHex);

        let i=0;

        while(decryptedDataHex==null){

          if (i==0){ encryptedDataHex = rs.b64tohex(encryptedDataB64); }
          if (i==1){ encryptedDataHex = rs.b64utohex(encryptedDataB64); }
          if (i==2){ encryptedDataHex = rs.b64tohex(encryptedDataB64); i=-1; }

          decryptedDataHex = rs.KJUR.crypto.Cipher.decrypt(encryptedDataHex, privateKey, "RSA");
          console.log("desencriptaRSA - decryptedDataHex " + i + " : ", decryptedDataHex);

          if (decryptedDataHex == null && i==-1){
            return null;
          }

          i = i +1;
        }

        return decryptedDataHex;
    }*/

  generaRSAKey() {
    // Genere la llave pública y privada del dispositivo
    return rs.KEYUTIL.generateKeypair("RSA", 2048);
  }

  extraePublicKey(rsaKeyPair) {
    return rsaKeyPair.pubKeyObj;
  }

  extraePrivateKey(rsaKeyPair) {
    return rsaKeyPair.prvKeyObj;
  }

  pemToKey(pemKey) {
    return rs.KEYUTIL.getKey(pemKey);
  }

  static generaPubKeyFromModulus(modulus, exponent) {
    // Not implemented
  }

  //static descomponePubKey(keyPairRSA) {
  descomponePubKey(publicRSAKey) {
    // Descompone una llave pública (RSA Puro) en sus partes:
    // Modulus y Exponent.
    // Regresa un JSON con ambas partes codificado en Base64.
    // let pubKeyRSA = keyPairRSA.pubKeyObj;
    return this.getExponentAndModulusFromPubKey(publicRSAKey)
  }

  getExponentAndModulusFromPubKey(pubKeyRSA) {
    let exponent = new rs.BigInteger(pubKeyRSA.e.toString());
    let exponentBA = exponent.toByteArray();
    let exponentHex = RSAUtils.toHexString(exponentBA);
    let exponentB64 = rs.hextob64(exponentHex);   // DO Match with Java
    // ---
    let modulus = pubKeyRSA.n;
    let modulusBA = modulus.toByteArray();
    let moduluxHex = RSAUtils.toHexString(modulusBA); //rs.BAtohex(modulusBA);
    let modulusB64 = rs.hextob64(moduluxHex);   // DO NOT Match with Java, convert from bytes, not from string representation *******

    return {
      "exponent": exponent.toString(),
      "exponentBA": exponentBA,
      "exponentB64": exponentB64,
      "exponentHex": exponentHex,
      "modulus": modulus.toString(),
      "modulusBA": modulusBA,
      "modulusB64": modulusB64,
      "modulusHex": moduluxHex
    };
  }

  publicKeyToBase64(publicRSAKey) {
    let pubKeyPEM = rs.KEYUTIL.getPEM(publicRSAKey);
    let pubKeyHex = rs.pemtohex(pubKeyPEM, "PUBLIC KEY");
    return rs.hextob64(pubKeyHex);
  }

  privateKeyToBase64(privateRSAKey) {
    let prvKeyPEM = rs.KEYUTIL.getPEM(privateRSAKey, "PKCS1PRV");
    let prvKeyHex = rs.pemtohex(prvKeyPEM, "RSA PRIVATE KEY");
    return rs.hex2b64(prvKeyHex);
  }

  base64ToPublicKey(base64PubKey) {
    const pubKeyPEM = rs.hextopem(rs.b64tohex(base64PubKey), 'PUBLIC KEY');
    return rs.KEYUTIL.getKey(pubKeyPEM);    // RSAKey
  }

  base64ToPrivateKey(base64PrivKey) {
    const pubKeyPEM = rs.hextopem(rs.b64tohex(base64PrivKey), 'RSA PRIVATE KEY');
    return rs.KEYUTIL.getKey(pubKeyPEM);    // RSAKey
  }

  static toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

  static toByteArray(hexString) {
    let result = [];
    while (hexString.length >= 2) {
      result.push(parseInt(hexString.substring(0, 2), 16));
      hexString = hexString.substring(2, hexString.length);
    }
    return result;
  }
}
