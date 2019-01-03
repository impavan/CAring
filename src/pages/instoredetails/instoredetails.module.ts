import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { InstoredetailsPage } from './instoredetails';
import { LaunchNavigator } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    InstoredetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstoredetailsPage),
    SharedModule
  ],
  providers:[LaunchNavigator]
})
export class InstoredetailsPageModule {}
