import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { AfterContentInit } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import * as $ from 'jquery';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { LogUtils } from "../../shared/utils/log-utils";
import { AppGlobals } from "../../services/globals";
import { Encriptador } from "../../shared/utils/encripta";

import { BankService } from "../../services/bank.service";

import * as RSAXML from 'rsa-xml';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterContentInit {

  private encriptador: Encriptador;
  private secureStorage : SecureStorageObject;

  private usuario: string = "";

  constructor(public nav: NavController, private globVars: AppGlobals, private secureStore: SecureStorage, private bankService: BankService) {
    this.nav = nav;
    this.encriptador = new Encriptador();

    this.secureStore.create('my_store_name').then((storage: SecureStorageObject) => { this.secureStorage = storage; });

  }

  ngAfterContentInit() {

    var wh = $(window).height() + 1;
    var ww = $(window).width() + 1;

    $("#textoIngresar").css("color", "white");
    //$("#video-background").css('width', (ww+'px'));
    //$("#video-background").css('height', ((wh+45)+'px'));
    $('#video-background').attr('playsinline', '');

    setTimeout(function() { animateHome(); }, 2700);
  }

  public menuBotones() {
    if ($('#menuBotones').css("display") == "none") {
      $('#menuBotones').show();
      $('#menuBotones').addClass('animated zoomInDown');
    } else {
      $('#menuBotones').hide();
    }
  }

  public goToLogin() {
    this.nav.push(LoginPage);
  }

  public onUsrChange(args) {
    this.globVars.usrName = this.usuario.trim();
    console.log(this.globVars.usrName);
  }

  public login() {

    let errorEnServicio = null;
    let usrImage = null;

    console.log("login", new Date().toLocaleTimeString());
    this.secureStorage.set(AppGlobals.USR_NAME_KEY, this.globVars.usrName).then(data => console.log(data), error => console.log(error));
    //this.secureStorage.setSync({ key: AppGlobals.USR_NAME_KEY, value: this.globVars.usrName });
    console.log(this.globVars.usrName);

    let HASH = CryptoJS.SHA256("adrian");
    let B64HASH = CryptoJS.enc.Base64.stringify(HASH);

    let encryptedUsrName = this.encriptador.encriptaRSA(this.globVars.usrName, this.globVars.wsPublicKey);
    let encryptedKeyAES = this.encriptador.encriptaRSA(B64HASH, this.globVars.wsPublicKey);

    console.log("usuario:", this.globVars.usrName);

    LogUtils.debug("EU : " + encryptedUsrName);
    LogUtils.debug("EK : " + encryptedKeyAES);

    this.bankService.obtenerUsrImagen(encryptedUsrName, encryptedKeyAES)
      .subscribe(
        (data) => {
          //conco.log("obtenerUsrImage:",JSON.stringify(data));
          let PRESP_COD: string = data["NewDataSet"]["Table"]["PRESP_COD"];
          let PMENSAJE: string = data["NewDataSet"]["Table"]["PMENSAJE"];
          let PRIVATE_KEY: string = data["NewDataSet"]["Table"]["PMENSAJE2"];
          let PRIVATE_KEY_A = PRIVATE_KEY.split("==");

          LogUtils.debug(PRESP_COD + " - " + PMENSAJE);
          LogUtils.debug(PRIVATE_KEY);

          let first = PRESP_COD.toString().substr(0, 1);
          // Si el primer char de PRESP_COD es digito --> Hubo problemas
          if ("0123456789".indexOf(first) === -1) {

            let usrName = PMENSAJE;
            usrImage = `data:image/png;base64,${PMENSAJE}`;

            let accountNumberBase64 = PRIVATE_KEY_A[1] + "==";
            let initializationVectorBase64 = PRIVATE_KEY_A[0] + "==";

            let ct = CryptoJS.enc.Base64.parse(accountNumberBase64);
            let iv = CryptoJS.enc.Base64.parse(initializationVectorBase64);

            // Use crypto to decrypt
            let privKey = CryptoJS.AES.decrypt({
              ciphertext: ct
            },
              HASH, {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.NoPadding,
                iv: iv
              }
            );
            console.log('decrypted, by hand: ' + privKey);

            let PRIV_KEY = privKey.toString(CryptoJS.enc.Utf8);
            LogUtils.debug(PRIV_KEY);

            var rsa = new RSAXML();
            rsa.importKey(PRIV_KEY);

            this.globVars.rsaPrivateKey = rsa;

            this.nav.push(LoginPage, {'usrName':usrName, 'usrImage':usrImage});

          }
          else {
            alert(data["NewDataSet"]["Table"]["PMENSAJE"]);
            /**this.alertOptions = {
              "mensaje1": data["NewDataSet"]["Table"]["PMENSAJE"],
              "textoBtnAceptar": "Aceptar",
              "onBtnAceptarTap": () => { this.alertShow = false; }
            }; this.alertShow = true;*/
          }


        },
        (error) => {
          alert(error);
        },
    );

  }
}

function animateHome() {
  $('#headerViewMain').show();
  $('#headerViewMain').addClass('animated zoomInUp');
  $('#botonIngresar').show();
  $('#formUser').show();
  $('#formUser').addClass('animated zoomInDown');
  $('#btnIngresar').show();
  $('#btnIngresar').addClass('animated zoomInDown');
}
