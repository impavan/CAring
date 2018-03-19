import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConditionsPage } from './conditions';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ConditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConditionsPage),
    SharedModule
  ],
})
export class ConditionsPageModule {}
