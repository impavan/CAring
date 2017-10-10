import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { StoreLocatorPage } from './store-locator';

@NgModule({
  declarations: [
    StoreLocatorPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreLocatorPage),
    SharedModule
  ],
})
export class StoreLocatorPageModule {}
