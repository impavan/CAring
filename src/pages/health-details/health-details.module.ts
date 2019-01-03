import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDetailsPage } from './health-details';
import { SharedModule } from '../../app/shared.module';
import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    HealthDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDetailsPage),
    SharedModule
  ],
  providers:[SocialSharing]
})
export class HealthDetailsPageModule {}
