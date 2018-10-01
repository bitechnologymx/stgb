import { Injectable } from '@angular/core'

@Injectable()
export class AppGlobals {

  public NODE_RSA_PRIVATE_KEY: any;

  public ACTIVE_DRAWER: any;

  public STORAGE_KEY: string = "SRSA_KEY";
  public WS_PUBLIC_KEY: string = "SWS_PUBLIC_KEY";
  public RSA_KEY_PAIR: string = "SRSA_KEY_PAIR";
  public RSA_PUBLIC_KEY: string = "SRSA_PUBLIC_KEY";
  public RSA_PUBLIC_MODULUS_KEY: string = "SRSA_PUBLIC_M_KEY";
  public RSA_PUBLIC_EXPONENT_KEY: string = "SRSA_PUBLIC_E_KEY";
  public RSA_PRIVATE_KEY: string = "SRSA_PRIVATE_KEY";

  public RSA_PRIVATE_KEY_OBJ: any;

  public static USR_NAME_KEY: string = "USR_NAME_KEY";
  public static ULT_SECUENCIA_ENCRIPTADA_KEY: string = "ULT_SECUENCIA_ENCRIPTADA_KEY";

  public usrName: string = "";
  public usrPwd: string = "";
  public bankUsrName: string = "";
  public ultIngreso: string = "";
  public bankUsrCIF: string = "";
  public tipoCuentas = {
    numCuentas: 0,
    numTarjetas: 0,
    numPrestamos: 0,
    hubActivo: null
  };
  public rsaKeyPair: any;     // Llave RSA generada por el dispositivo (Pair).
  public rsaPublicKey: any;   // Llave pública generada por el dispositivo.
  public rsaPublicModulusKey: any;   // Llave pública modulus generada por el dispositivo.
  public rsaPublicExponentKey: any;   // Llave pública exponent generada por el dispositivo.
  public rsaPrivateKey: any;  // Llave privada generada por el dispositivo.
  public wsPublicKey: any;    // Llave pública del WS-Banco.
  public ultSecuencia: any;   // Ultima secuencia enviada por el Banco.
  /*
   Se decide guardar mejor la secuencia encriptada, 9/Ago/2018; cuando se hayan modificado
   todos los servicios que involucran la secuencia por secuencia encriptada, se procederá
   a eliminar el campo ultSecuencia.
   */
  public ultSecuenciaEncriptada: any = null;
  public ultHash: string = "";
  public callCenterNum: string = "+507 270-5000";
  public callCenterNumiOS: string = "+507-270-5000";
  public wsGenericErrMsg: string = "Banca Móvil en mantenimiento, por favor inténte más tarde.";
  public contactoSubject: string = "Contacto por Banca Móvil";
  public contactoSender: string = "info@stgeorgesbank.com";
  public contactoEmails: Array<string> = ["r2ferna@gmail.com", "fernando.rodriguez@Bitechnology.com.mx"];
  //public contactoEmails : Array<string> = ["servicioalcliente@stgeorgesbank.com", "belbancaenlinea@stgeorgesbank.com"];
  public contactoCC: Array<string> = ["info@stgeorgesbank.com"];
  public sessionTimeOut: number = 300000; // (5 min)(60 seg/min)(1000 ms/seg) = 300,000 ms
  public sessionTimeOutCheck: number = 60000; // (1 min)(60 seg/min)(1000 ms/seg) = 60,000 ms
  public noInternetConectionMsg: string = "Por favor, verifique su conexión a internet.";
  public ipDispositivo: string = "";
  public timerIntervalo: any = null;

  public opcionesCargadas: boolean = false;
  public opciones = {
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
