import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public background:boolean;
  public push:boolean;
  public wifi:boolean;
  public pushbk:boolean;
  public skin;
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.retrieve();
    this.theme();
  }
  public update(){
    localStorage.setItem("background", this.background.toString());
    localStorage.setItem("push", this.push.toString());
    localStorage.setItem("wifi", this.wifi.toString());
    localStorage.setItem("pushbk", this.pushbk.toString());
    localStorage.setItem("skin", this.skin);
    this.theme(this.skin);
  }
  public stringToBoolean(value:string):boolean{
    if (value=="true" || value=="True" || value=="TRUE"){
      return true;
    }else{
      return false;
    }
  }
  public retrieve(){
    this.background=this.stringToBoolean(localStorage.getItem("background"));
    this.push=this.stringToBoolean(localStorage.getItem("push"));
    this.wifi=this.stringToBoolean(localStorage.getItem("wifi"));
    this.pushbk=this.stringToBoolean(localStorage.getItem("pushbk"));
    this.skin=localStorage.getItem("skin");
    if (this.skin=="null"){
      this.skin="white";
    }
  }
  public theme(col=localStorage.getItem("skin")){
    if (col=="dark"){
      document.getElementById("body").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("bk").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("push").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("pushbk").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("wif").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("skin").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("body").style.color="white";
    }else if (col=="white"){
      document.getElementById("body").style.backgroundColor="white";
      document.getElementById("bk").style.backgroundColor="white";
      document.getElementById("push").style.backgroundColor="white";
      document.getElementById("pushbk").style.backgroundColor="white";
      document.getElementById("wif").style.backgroundColor="white";
      document.getElementById("skin").style.backgroundColor="white";
      document.getElementById("body").style.color="black";
    }
  }
}
