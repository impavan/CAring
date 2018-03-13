import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthSubscribePage } from './health-subscribe';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    HealthSubscribePage,
  ],
  imports: [
    IonicPageModule.forChild(HealthSubscribePage),
    SharedModule
  ],
})
export class HealthSubscribePageModule {}
