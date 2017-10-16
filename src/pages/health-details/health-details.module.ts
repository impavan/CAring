import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDetailsPage } from './health-details';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    HealthDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDetailsPage),
    SharedModule
  ],
})
export class HealthDetailsPageModule {}
