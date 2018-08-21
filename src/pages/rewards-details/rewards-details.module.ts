import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { RewardsDetailsPage } from './rewards-details';
import { RewardsProvider } from '../../providers/rewards/rewards';



@NgModule({
  declarations: [
    RewardsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsDetailsPage),
    SharedModule
  ],
  providers:[RewardsProvider]
})
export class RewardsDetailsPageModule {}
