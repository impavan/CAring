import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberPage } from './member';
import { SharedModule } from '../../app/shared.module';
import { UniquePipe } from '../../pipes/unique/unique';

@NgModule({
  declarations: [
    MemberPage,
    UniquePipe
  ],
  imports: [
    IonicPageModule.forChild(MemberPage),
    SharedModule,
  ],
})
export class MemberPageModule {}
