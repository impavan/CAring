import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { SharedModule } from '../../app/shared.module';
import { ProfileProvider } from '../../providers/profile/profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
  providers:[ProfileProvider]
})
export class ProfilePageModule {}
