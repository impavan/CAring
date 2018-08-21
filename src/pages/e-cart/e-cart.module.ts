import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ECartPage } from './e-cart';
import { SharedModule } from '../../app/shared.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    ECartPage,
  ],
  imports: [
    IonicPageModule.forChild(ECartPage),
    SharedModule
  ],
  providers:[InAppBrowser]
})
export class ECartPageModule {}
