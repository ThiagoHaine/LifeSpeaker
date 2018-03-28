import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  public col;
  public url="http://haine.com.br/thiago/glasses/";
  constructor(private localNotifications: LocalNotifications,private backgroundMode: BackgroundMode,private file: File,private transfer: FileTransfer) {

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
    this.col=localStorage.getItem("skin");
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
    //check new
    if (this.stringToBoolean(localStorage.getItem("push"))==true){
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    fileTransfer.download(this.url+"check.php?id=new", this.file.dataDirectory + 'new.txt',true).then(_ =>{
      this.file.readAsText(this.file.dataDirectory, 'new.txt').then(fileStr => {
        if (fileStr=="1"){
          this.localNotifications.schedule({
            id: 1,
            title: 'LifeSpeaker',
            text: 'Novo pedido de ajuda!'
          });          
        }
      }).catch(err => {
      });
    }).catch(err => {
    });
    //
    }
    setTimeout(() => {
      this.setBackground();
    }, 1000);
  }
}
