import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogUtils } from "../../shared/utils/log-utils";
import { AppGlobals } from "../../services/globals";
import { Encriptador } from "../../shared/utils/encripta";

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { BankService } from "../../services/bank.service";
import { PrincipalPage } from "../principal/principal";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit, AfterViewInit {

  private encriptador: Encriptador;
  private secureStorage : SecureStorageObject;

  public password:string = "";
  public solicitandoTipoCliente: boolean = false;
  public showLinkOlvido: boolean = false;
  public validandoUsrLogin: boolean = false;
  public errorEnServicio: string = "";

  constructor(public nav: NavController, public navParams: NavParams,
              private globVars: AppGlobals, private secureStore: SecureStorage, private bankService: BankService) {
    this.encriptador = new Encriptador();
    this.secureStore.create('my_store_name').then((storage: SecureStorageObject) => { this.secureStorage = storage; });
  }

  ngAfterViewInit(): void {
    this.solicitaTipoCliente();
  }

  ngOnInit() {
    this.globVars.usrPwd = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public onChange(args) {
    this.globVars.usrPwd = this.password.trim();
    console.log(this.globVars.usrPwd);
  }

  private solicitaTipoCliente() {

    let clienteEncriptado = this.encriptador.encriptaRSA(this.globVars.usrName, this.globVars.wsPublicKey);
    this.bankService.obtenerTipoCliente(clienteEncriptado)
      .subscribe(
        (data) => {
          this.solicitandoTipoCliente = false;
          console.log("solicitaTipoCliente:", JSON.stringify(data));
          //let PRESP_COD = data["NewDataSet"]["Table"]["PRESP_COD"];
          let tipoCliente = data["NewDataSet"]["Table"]["PMENSAJE"];
          //console.log("Codigo:",PRESP_COD);
          //console.log("Tipo cliente:", tipoCliente);
          this.showLinkOlvido = (tipoCliente == "Natural") ? true : false;
        },
        (error) => {
          this.solicitandoTipoCliente = false;
          //this.muestraErrorEnServicio();
        },
    );
  }

  private validaUsrLogin() {

    LogUtils.debug("validaUsrLogin....");
    this.validandoUsrLogin = true;
    this.errorEnServicio = null;

    this.secureStorage.get(AppGlobals.USR_NAME_KEY).then(data => this.loginUserPassword(data), error => console.log(error));

  }

  public loginUserPassword(usrName){

    console.log(usrName);

    //let usrName = this.secureStorage.getSync({ key: AppGlobals.USR_NAME_KEY });
    let usrNameAndPwd = usrName + "|" + this.globVars.usrPwd;

    let encryptedNaP = this.encriptador.encriptaRSA(usrNameAndPwd, this.globVars.wsPublicKey);
    let dataDisp = "Emulator554";

    LogUtils.debug(this.globVars.wsPublicKey);

    console.log("Usr&Pwd:", usrNameAndPwd);
    //this.busyModal({titulo:"Buscando algo..."});
    this.bankService.validarUsrLogin(encryptedNaP, "1.1.1.1", dataDisp)
      .subscribe(
        (data) => {

          this.validandoUsrLogin = false;

          console.log("validaUsrPwdLogin:", JSON.stringify(data));
          let PRESP_COD = data["NewDataSet"]["Table"]["PRESP_COD"];
          let PMENSAJE = data["NewDataSet"]["Table"]["PMENSAJE"];
          console.log("Codigo:", PRESP_COD);
          //console.log("MENSAJE",data["NewDataSet"]["Table"]["PMENSAJE"] );
          if (PRESP_COD == "0") {

            try {

              this.globVars.ultSecuencia = null;

              try {

                //this.globVars.ultSecuencia = this.globVars.rsaPrivateKey.decrypt(PMENSAJE).toString();
                this.globVars.ultSecuencia = this.encriptador.desencriptaRSA(PMENSAJE, this.globVars.rsaPrivateKey);

                if (this.globVars.ultSecuencia == null) {
                  this.validandoUsrLogin = false;
                  //this.muestraErrorEnServicio();
                }

              } catch (e) { console.log("Error encripta:", e) }

            } catch (e) { console.log("Errorsito: ", e) }

            console.log("Secuencia:", this.globVars.ultSecuencia);

            if (this.globVars.ultSecuencia == null) { console.log("UltSecuencia null") };
            if (this.globVars.wsPublicKey == null) { console.log("Pub Key-- Null") };
            // 10/Ago/2018

            console.log("ultSecuenciaEncriptada");
            this.globVars.ultSecuenciaEncriptada = this.encriptador.encriptaRSA(this.globVars.ultSecuencia, this.globVars.wsPublicKey);

            console.log("ultSecuenciaEncriptada:", this.globVars.ultSecuenciaEncriptada);

            this.traeTiposDeCuentas(this.globVars.ultSecuenciaEncriptada);
            this.leeUltimoAcceso(this.globVars.ultSecuenciaEncriptada);

            this.menuPrincipal();

          } else if (PRESP_COD == "5") {
            this.globVars.ultSecuencia = this.encriptador.desencriptaRSA(PMENSAJE, this.globVars.rsaPrivateKey);
            //this.cambiaPasswdExpirada();
          } else if (PRESP_COD == 100) {
            //this.solicitaMensaje(PRESP_COD, this.showMensaje100.bind(this));
          } else {
            alert(PMENSAJE);
          }
        },
        (error) => {
          this.validandoUsrLogin = false;
          alert(error);
        },
    );
  }

  private leeUltimoAcceso(encryptedSecuencia) {

    //console.log("LeeUltimoAcceso:", this.encryptedSecuencia);
    this.bankService.obtenerUltimoAcceso(encryptedSecuencia)
      .subscribe(
        (data) => {
          console.log("ultimoAcceso:", JSON.stringify(data));
          this.globVars.bankUsrName = this.encriptador.desencriptaRSA(
            data["NewDataSet"]["Table"]["PNAME"], this.globVars.rsaPrivateKey
          ).toString();
          this.globVars.ultIngreso = data["NewDataSet"]["Table"]["PLAST_INTRO"];
          this.globVars.bankUsrCIF = data["NewDataSet"]["Table"]["PCIF"];
          //console.log("Nombre:",this.globVars.bankUsrName);
          //console.log("Fecha:", this.globVars.ultIngreso);
          //console.log("CIF", this.globVars.bankUsrCIF);
        },
        (error) => {
          alert(error);
        });
  }

  private traeTiposDeCuentas(encryptedSecuencia) {
    console.log("traeTiposDeCuentas");
    this.errorEnServicio = null;
    //
    this.bankService.obtenerTiposDeCuentas(encryptedSecuencia)
      .subscribe(
        (data) => {
          console.log("traeTiposDeCuentas:", JSON.stringify(data));
          this.globVars.tipoCuentas.numCuentas = data["NewDataSet"]["Table"]["PCC"];
          this.globVars.tipoCuentas.numTarjetas = data["NewDataSet"]["Table"]["PTC"];
          this.globVars.tipoCuentas.numPrestamos = data["NewDataSet"]["Table"]["PPR"];
          this.globVars.tipoCuentas.hubActivo = data["NewDataSet"]["Table"]["PHUB_ACTIVO"];
          console.log("numCuentas:", this.globVars.tipoCuentas.numCuentas);
          console.log("numTarjetas:", this.globVars.tipoCuentas.numTarjetas);
          console.log("numPrestamos", this.globVars.tipoCuentas.numPrestamos);
          console.log("hubActivo", this.globVars.tipoCuentas.hubActivo);

          //this.sgbLogic.opcionesOnOff();
        },
        (error) => {
          alert(error);
        },
    );
  }

  private menuPrincipal() {
    this.nav.push(PrincipalPage);
  }

}
