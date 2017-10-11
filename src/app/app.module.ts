import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,  } from 'ionic-angular';
import { HttpModule } from '@angular/http';
// import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HapenningsProvider } from '../providers/hapennings/hapennings';
import { ConfigProvider } from '../providers/config/config';
import { StoreLocatorProvider } from '../providers/store-locator/store-locator';

@NgModule({
  declarations: [
    MyApp,
   
 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HapenningsProvider,
    ConfigProvider,
    StoreLocatorProvider,
  ]
})
export class AppModule {}
