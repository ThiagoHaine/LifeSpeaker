import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.theme();
    }, 1000);
  }
  public theme(){
    let col=localStorage.getItem("skin");
    if (col=="dark"){
      document.getElementById("body").style.backgroundColor="rgb(77, 77, 77)";
      document.getElementById("body").style.color="white";
    }else if (col=="white"){
      document.getElementById("body").style.backgroundColor="white";
      document.getElementById("body").style.color="black";
    }
    setTimeout(() => {
      this.theme();
    }, 1000);
  }

}
