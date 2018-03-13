import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { InstoredetailsPage } from './instoredetails';

@NgModule({
  declarations: [
    InstoredetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstoredetailsPage),
    SharedModule
  ],
})
export class InstoredetailsPageModule {}
