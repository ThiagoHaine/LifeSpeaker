import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Screenshot } from '@ionic-native/screenshot';
import { FileOpener } from '@ionic-native/file-opener';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { File } from '@ionic-native/file';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  public id:number;
  public n=1;
  public url="http://haine.com.br/thiago/glasses/";
  public voiceBuffer = new Array(); 
  public nBuffer=0;
  public falando=false;
  constructor(private screenOrientation: ScreenOrientation, private transfer: FileTransfer,private tts: TextToSpeech,private file: File,private cameraPreview: CameraPreview,private fileOpener: FileOpener,private screenshot: Screenshot, public navCtrl: NavController, private androidFullScreen: AndroidFullScreen) {
  
  
  }

  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.addSpeak("Aponte o celular para o local desejado e pressione a tela para tirar uma foto");
    this.fullscreen();
    this.camera();
  }

  public speak(){
    if (this.falando==false){
      if (this.nBuffer<this.voiceBuffer.length){
        this.nBuffer++;
        let word=this.voiceBuffer[(this.nBuffer-1)];
        this.falando=true;
        this.tts.speak({
          locale: 'pt-BR',
          rate: 1,
          text: word
        }).then(() => {
          this.falando=false;
        }).catch((reason: any) => {
          console.error('Error', reason);
        });
      }
    }
    setTimeout(() => {
      this.speak();
    }, 1000);
  }

  public cardinalToOrdinal(num:number){
    let strn:string;
    strn=num.toString();
    if (strn.length==1){
      switch(strn){
        case "1":
          return "primeira";
        case "2":
          return "segunda";
        case "3":
          return "terceira";
        case "4":
          return "quarta";
        case "5":
          return "quinta";
        case "6":
          return "sexta";
        case "7":
          return "sétima";
        case "8":
          return "oitava";
        case "9":
          return "nona";
      }
    }else if (strn.length==2){
      let fl=strn.charAt(0);
      let sl=strn.charAt(1);
      
      switch(fl){
        case "1":
          fl="décima";
          break;
        case "2":
          fl="vigésima";
          break;
        case "3":
          fl="trigésima";
          break;
        case "4":
          fl="quadragésima";
          break;
        case "5":
          fl="quinquagésima";
          break;
      }
      return fl+" "+this.cardinalToOrdinal(Number(sl));
    }
  }

  public addSpeak(word:string){
    this.voiceBuffer.push(word);
    this.speak();
  }



  public wait(n,id){
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    fileTransfer.download(this.url+"check.php?id="+id.toString(), this.file.dataDirectory + 'file'+n.toString()+'.txt',true).then(_ =>{
      this.file.readAsText(this.file.dataDirectory, 'file'+n.toString()+'.txt').then(fileStr => {
        if (fileStr=="nada"){
          setTimeout(() => {
            this.wait(n,id);
          }, 5000);
        }else{
          this.addSpeak("A "+this.cardinalToOrdinal(n)+" foto tirada mostrava "+fileStr);
        }
      }).catch(err => {
        this.addSpeak("erro de leitura de resposta");
      });
    }).catch(err => {
      this.addSpeak("erro de download de resposta");
      setTimeout(() => {
        this.wait(n,id);
      }, 5000);
      
    });

  }

  public uploadImage(n) {
    // Destination URL
    var url = this.url+"upload.php";
    const fileTransfer: FileTransferObject = this.transfer.create();
    // File for Upload
    var targetPath = this.file.dataDirectory+"photo"+n.toString()+".jpg";
   
    // File name only
    this.id=Math.floor(Math.random()*1000);
    var filename = this.id.toString()+".jpg";
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.addSpeak("Agora é só aguardar uma resposta");
      this.wait(n,this.id);
    }, err => {
      this.addSpeak("Erro de conexão");
    });
  }

public savebase64AsImageFile(content,contentType,n){

let byteCharacters = atob(content);
let byteArrays = [];
for (let offset = 0; offset < byteCharacters.length; offset += 512) {
  let slice = byteCharacters.slice(offset, offset + 512);

  let byteNumbers = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
  }

  let byteArray = new Uint8Array(byteNumbers);

  byteArrays.push(byteArray);
}

let blob = new Blob(byteArrays, {type: contentType});
this.file.createFile(this.file.dataDirectory, "photo"+n.toString()+".jpg", true);
this.file.writeFile(this.file.dataDirectory, "photo"+n.toString()+".jpg", blob, {replace: true}).then(_ =>{
  this.uploadImage(n);
}).catch(err => this.addSpeak("erro de gravação"));


}

  public takePhoto(){
      this.file.removeFile(this.file.dataDirectory, "photo.jpg").then(_ =>{
          // picture options
          const pictureOpts: CameraPreviewPictureOptions = {
            width: 1280,
            height: 1280,
            quality: 85
          }

          // take a picture
          this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
            this.savebase64AsImageFile(imageData,"image/jpeg",this.n);
            this.n++;
          }, (err) => {
            this.addSpeak("Erro ao fotografar");
          });
      }).catch(err =>{
          // picture options
          const pictureOpts: CameraPreviewPictureOptions = {
            width: 1280,
            height: 1280,
            quality: 80
          }

          // take a picture
          this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
            this.savebase64AsImageFile(imageData,"image/jpeg",this.n);
            this.n++;
          }, (err) => {
            this.addSpeak("Erro ao fotografar");
          });
      });
      
  }

  public fullscreen(){
    this.androidFullScreen.immersiveMode()
  .then(() => console.log('Immersive mode supported'))
  .catch(err => console.log('Immersive mode error'));
  }

  public camera(){
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };
    
    // start camera
    
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });

  }
  
}
