import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberPage } from './member';
import { SharedModule } from '../../app/shared.module';
import { ProfileProvider } from '../../providers/profile/profile';
import { RoundPipe } from '../../pipes/round/round';


@NgModule({
  declarations: [
    MemberPage,
    RoundPipe
  ],
  imports: [
    IonicPageModule.forChild(MemberPage),
    SharedModule,
  ],
  providers:[ProfileProvider]
})
export class MemberPageModule {}
