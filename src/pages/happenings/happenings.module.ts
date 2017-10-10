import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { HappeningsPage } from './happenings';

@NgModule({
  declarations: [
    HappeningsPage,
  ],
  imports: [
    IonicPageModule.forChild(HappeningsPage),
    SharedModule
  ],
})
export class HappeningsPageModule {}
