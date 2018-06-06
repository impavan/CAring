import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './homepage';
import { SharedModule } from '../../app/shared.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    HomePage,
    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SharedModule
  ],
  providers:[InAppBrowser]
})
export class HomePageModule {}
