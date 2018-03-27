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
  }
  public update(){
    localStorage.setItem("background", this.background.toString());
    localStorage.setItem("push", this.push.toString());
    localStorage.setItem("wifi", this.wifi.toString());
    localStorage.setItem("pushbk", this.pushbk.toString());
    localStorage.setItem("skin", this.skin);
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
  }
}
