import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpPage } from './otp';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    OtpPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpPage),
    SharedModule
  ],
})
export class OtpPageModule {}
