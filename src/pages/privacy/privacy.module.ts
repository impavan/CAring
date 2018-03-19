import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyPage } from './privacy';
import { SharedModule } from '../../app/shared.module';


@NgModule({
  declarations: [
    PrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyPage),
    SharedModule
  ],
})
export class PrivacyPageModule {}
