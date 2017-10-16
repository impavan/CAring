import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberPointsPage } from './member-points';

@NgModule({
  declarations: [
    MemberPointsPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberPointsPage),
  ],
})
export class MemberPointsPageModule {}
