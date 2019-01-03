import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HappenDetailsPage } from './happen-details';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    HappenDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HappenDetailsPage),
    SharedModule
  ],
})
export class HappenDetailsPageModule {}
