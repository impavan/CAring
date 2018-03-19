import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { RewardsDetailsPage } from './rewards-details';

@NgModule({
  declarations: [
    RewardsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsDetailsPage),
    SharedModule
  ],
})
export class RewardsDetailsPageModule {}
