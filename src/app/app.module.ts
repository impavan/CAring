import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { StatusBar } from '@ionic-native/status-bar';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';



// Import Providers.
import { ExceptionHandlerProvider } from '../providers/exception-handler/exception-handler';
import { UserdataProvider } from '../providers/userdata/userdata';
import { NetworkProvider } from '../providers/network/network';
import { RewardsProvider } from '../providers/rewards/rewards';
import { DeviceProvider } from '../providers/device/device';
import { LoaderProvider } from '../providers/loader/loader';
import { AlertProvider } from '../providers/alert/alert';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { HapenningsProvider } from '../providers/hapennings/hapennings';
import { StoreLocatorProvider } from '../providers/store-locator/store-locator';
import { SharedModule } from './shared.module';
import { PushProvider } from '../providers/push/push';
import { ApiProvider } from '../providers/api/api';
import { ZoomProvider } from '../providers/zoom/zoom';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: false,
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
    AlertProvider,Contacts,
    Diagnostic,
    OpenNativeSettings,
    LoaderProvider, AlertProvider,Geolocation,LaunchNavigator,
    Camera, AppVersion, ScreenOrientation, Device, Network, ExceptionHandlerProvider, AuthProvider, UserdataProvider, LoaderProvider, AlertProvider, RewardsProvider,
    NetworkProvider, DeviceProvider, ProfileProvider, InAppBrowser,
    PushProvider,Deeplinks,Keyboard,
    ApiProvider,
    ZoomProvider,
    SocialSharing
  ]
})
export class AppModule { }
