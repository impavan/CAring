import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { HappeningsPage } from './happenings';
import { InStorePage } from '../in-store/in-store'

@NgModule({
  declarations: [
    HappeningsPage,
    InStorePage
  ],
  imports: [
    IonicPageModule.forChild(HappeningsPage),
    SharedModule,
    
  ],
})
export class HappeningsPageModule {}
