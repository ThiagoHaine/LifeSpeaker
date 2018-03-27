import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//PLUGINS
import { CameraPreview } from '@ionic-native/camera-preview';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Screenshot } from '@ionic-native/screenshot';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
//

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    CameraPreview,
    AndroidFullScreen,
    Screenshot,
    FileOpener,
    FileTransfer,
    TextToSpeech,
    ScreenOrientation,
    File,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
