import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotionVoucherDetailsPage } from './promotion-voucher-details';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    PromotionVoucherDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionVoucherDetailsPage),
    SharedModule
  ],
})
export class PromotionVoucherDetailsPageModule {}
