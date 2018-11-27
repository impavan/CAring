import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotionVoucherDetailsPage } from './promotion-voucher-details';
import { SharedModule } from '../../app/shared.module';
import { RewardsProvider } from '../../providers/rewards/rewards';

@NgModule({
  declarations: [
    PromotionVoucherDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionVoucherDetailsPage),
    SharedModule
  ],
  providers:[RewardsProvider]
})
export class PromotionVoucherDetailsPageModule {}
