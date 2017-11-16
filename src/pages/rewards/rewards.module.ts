import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { RewardsPage } from './rewards';
import { UniquePipe } from '../../pipes/unique/unique';

@NgModule({
  declarations: [
    RewardsPage,
    UniquePipe
  ],
  imports: [
    IonicPageModule.forChild(RewardsPage),
    SharedModule
  ],
})
export class RewardsPageModule {}
