import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import { SharedModule } from '../../app/shared.module';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    SharedModule
  ],
  providers:[AppVersion]
})
export class MyAccountPageModule {}
