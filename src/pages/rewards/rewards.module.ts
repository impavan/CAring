import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { RewardsPage } from './rewards';
import { UniquePipe } from '../../pipes/unique/unique';
import { RewardsProvider } from '../../providers/rewards/rewards';
import { ProfileProvider } from '../../providers/profile/profile';


@NgModule({
  declarations: [
    RewardsPage,
    UniquePipe
  ],
  imports: [
    IonicPageModule.forChild(RewardsPage),
    SharedModule
  ],
  providers:[RewardsProvider,ProfileProvider]
})
export class RewardsPageModule {}
