import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { MemberPage } from './member';

@NgModule({
  declarations: [
    MemberPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberPage),
    SharedModule
  ],
})
export class MemberPageModule {}
