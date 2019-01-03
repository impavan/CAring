import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotionDetailsPage } from './promotion-details';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    PromotionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionDetailsPage),
    SharedModule
  ],
})
export class PromotionDetailsPageModule {}
