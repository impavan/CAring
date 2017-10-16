import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    SharedModule
  ],
})
export class MyAccountPageModule {}
