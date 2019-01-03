import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { HealthInfoPage } from './health-info';

@NgModule({
  declarations: [
    HealthInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthInfoPage),
    SharedModule
  ],
})
export class HealthInfoPageModule {}
