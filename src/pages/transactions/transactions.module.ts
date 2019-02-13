import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import { SharedModule } from '../../app/shared.module';
import { RewardsProvider } from '../../providers/rewards/rewards';
// import { RoundPipe } from '../../pipes/round/round';

@NgModule({
  declarations: [
    TransactionsPage,
    // RoundPipe
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
    SharedModule
  ],
  providers:[RewardsProvider]
})
export class TransactionsPageModule { }