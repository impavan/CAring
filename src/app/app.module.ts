import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { GoogleMaps } from '@ionic-native/google-maps';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { GoogleAnalytics } from '@ionic-native/google-analytics';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

// import { Geolocation } from '@ionic-native/geolocation';

// Import Providers.
import { ExceptionHandlerProvider } from '../providers/exception-handler/exception-handler';
import { EarnPointsProvider } from '../providers/earn-points/earn-points';
import { UserdataProvider } from '../providers/userdata/userdata';
import { NetworkProvider } from '../providers/network/network';
import { RewardsProvider } from '../providers/rewards/rewards';
import { DeviceProvider } from '../providers/device/device';
import { LoaderProvider } from '../providers/loader/loader';
import { StoresProvider } from '../providers/stores/stores';
import { AlertProvider } from '../providers/alert/alert';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { HapenningsProvider } from '../providers/hapennings/hapennings';
import { StoreLocatorProvider } from '../providers/store-locator/store-locator';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:false,
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HapenningsProvider,
    StoreLocatorProvider,
    LoaderProvider,
    AlertProvider,
    LoaderProvider, AlertProvider,
    Camera, AppVersion, ScreenOrientation, Device, Network, ExceptionHandlerProvider, AuthProvider, UserdataProvider, LoaderProvider, AlertProvider, RewardsProvider,
    Camera, EarnPointsProvider, AppVersion, ScreenOrientation, Device, NetworkProvider, Network, StoresProvider, DeviceProvider, ProfileProvider, InAppBrowser
    // Geolocation
  ]
})
export class AppModule { }
