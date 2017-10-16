import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberRedemptionPage } from './member-redemption';

@NgModule({
  declarations: [
    MemberRedemptionPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberRedemptionPage),
  ],
})
export class MemberRedemptionPageModule {}
