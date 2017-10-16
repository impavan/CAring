import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { PurchaseRewardsPage } from './purchase-rewards';

@NgModule({
  declarations: [
    PurchaseRewardsPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseRewardsPage),
    SharedModule
  ],
})
export class PurchaseRewardsPageModule {}
