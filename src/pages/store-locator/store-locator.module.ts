import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { Geolocation } from '@ionic-native/geolocation';
import { StoreLocatorPage } from './store-locator';
import { StoreLocatorProvider } from '../../providers/store-locator/store-locator';
import { LaunchNavigator } from '@ionic-native/launch-navigator';




@NgModule({
  declarations: [
    StoreLocatorPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreLocatorPage),
    SharedModule
  ],
  providers:[Geolocation,StoreLocatorProvider,LaunchNavigator]
})
export class StoreLocatorPageModule {}
