import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import { SharedModule } from '../../app/shared.module';
import { ProfileProvider } from '../../providers/profile/profile';
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
  providers:[ProfileProvider]
})
export class TransactionsPageModule { }