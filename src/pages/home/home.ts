import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterContentInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterContentInit {
  constructor(public navCtrl: NavController) {

  }
  ngAfterContentInit() {

    var wh = $(window).height()+1;
    var ww = $(window).width()+1;

    $("#textoIngresar").css("color", "white");
    //$("#video-background").css('width', (ww+'px'));
    //$("#video-background").css('height', ((wh+45)+'px'));
    $('#video-background').attr('playsinline','');
    //$("#video-background").css({'width':(ww+'px'),'height':((wh+45)+'px')});
    let video = document.getElementById("video-background");
    //video.play();
  }
}
