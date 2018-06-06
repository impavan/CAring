import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import { SharedModule } from '../../app/shared.module';
import { ProfileProvider } from '../../providers/profile/profile';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),
    SharedModule
  ],
  providers:[ProfileProvider]
})
export class EditProfilePageModule {}
