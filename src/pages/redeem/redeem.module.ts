import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedeemPage } from './redeem';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    RedeemPage,
  ],
  imports: [
    IonicPageModule.forChild(RedeemPage),
    SharedModule
  ],
})
export class RedeemPageModule {}
