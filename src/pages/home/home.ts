import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { AfterContentInit } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterContentInit {

  constructor(public nav: NavController) {
    this.nav = nav;
  }
  ngAfterContentInit() {

    var wh = $(window).height()+1;
    var ww = $(window).width()+1;

    $("#textoIngresar").css("color", "white");
    //$("#video-background").css('width', (ww+'px'));
    //$("#video-background").css('height', ((wh+45)+'px'));
    $('#video-background').attr('playsinline','');

    setTimeout(function(){ animateHome(); }, 2700);
  }
  public menuBotones(){
      if ($('#menuBotones').css("display") == "none") {
          $('#menuBotones').show();
          $('#menuBotones').addClass('animated zoomInDown');
      } else {
          $('#menuBotones').hide();
      }
  }
  public goToLogin(){
    this.nav.push(LoginPage);
  }
}
function animateHome(){
  $('#headerViewMain').show();
  $('#headerViewMain').addClass('animated zoomInUp');
  $('#botonIngresar').show();
  $('#formUser').show();
  $('#formUser').addClass('animated zoomInDown');
  $('#btnIngresar').show();
  $('#btnIngresar').addClass('animated zoomInDown');
}
