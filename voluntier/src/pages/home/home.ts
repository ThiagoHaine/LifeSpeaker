import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public show=true;
  constructor(public navCtrl: NavController,private network: Network) {

  }
  public url="http://www.haine.com.br/thiago/glasses/";
  ionViewDidLoad() {
    setTimeout(() => {
      this.setIframe();
    }, 1000);
  }

  public stringToBoolean(value:string):boolean{
    if (value=="true" || value=="True" || value=="TRUE"){
      return true;
    }else{
      return false;
    }
  }

  public setIframe(){
    let conf:boolean=this.stringToBoolean(localStorage.getItem("wifi"));
    if (conf==false){//não é pra funcionar com redes móveis
      if (this.network.type === 'wifi') {
        this.show=true;
      }else{//wifi ta desligado
        this.show=false;
      }
    }else{
      this.show=true;
    }
    setTimeout(() => {
      this.setIframe();
    }, 1000);
  }

}
