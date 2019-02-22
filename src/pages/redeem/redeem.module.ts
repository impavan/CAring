import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedeemPage } from './redeem';
import { SharedModule } from '../../app/shared.module';
import { RewardsProvider } from '../../providers/rewards/rewards';


@NgModule({
  declarations: [
    RedeemPage,
  ],
  imports: [
    IonicPageModule.forChild(RedeemPage),
    SharedModule
  ], 
  providers:[RewardsProvider]
})
export class RedeemPageModule {}
