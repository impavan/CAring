import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';

import { PromotionsPage } from './promotions';

@NgModule({
  declarations: [
    PromotionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionsPage),
    SharedModule,
  ],
})
export class PromotionsPageModule {}
