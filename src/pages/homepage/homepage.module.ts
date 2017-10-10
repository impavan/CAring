import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomepagePage } from './homepage';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    HomepagePage,
    
  ],
  imports: [
    IonicPageModule.forChild(HomepagePage),
    SharedModule
  ],
})
export class HomepagePageModule {}
