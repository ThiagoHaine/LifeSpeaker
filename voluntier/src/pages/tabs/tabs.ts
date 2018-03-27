import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private backgroundMode: BackgroundMode) {

  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.setBackground();
    }, 1000);
  }

  public stringToBoolean(value:string):boolean{
    if (value=="true" || value=="True" || value=="TRUE"){
      return true;
    }else{
      return false;
    }
  }

  public setBackground(){
    //alert(this.backgroundMode.isActive());
    let on=this.stringToBoolean(localStorage.getItem("background"));
    if (on==true){
      this.backgroundMode.enable();
      this.backgroundMode.configure({silent: !this.stringToBoolean(localStorage.getItem("pushbk")),title: "Life Speaker",text: "Esperando por pedidos de ajuda"});
      this.backgroundMode.overrideBackButton();
      this.backgroundMode.excludeFromTaskList();
    }else{
      this.backgroundMode.disable();
    }
    setTimeout(() => {
      this.setBackground();
    }, 1000);
  }
}
