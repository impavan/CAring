import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Badge } from '@ionic-native/badge';





// Import Providers.
import { AuthProvider } from '../providers/auth/auth';
import { UserdataProvider } from '../providers/userdata/userdata';
import { ApiProvider } from '../providers/api/api';


import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: false,
    }),
    LazyLoadImageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Diagnostic,
   ScreenOrientation, Network,
    Deeplinks,Keyboard,Badge,AuthProvider,UserdataProvider,ApiProvider
  ]
})
export class AppModule { }
