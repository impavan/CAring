import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { InStorePage } from './in-store';

@NgModule({
  declarations: [
    InStorePage,
  ],
  imports: [
    IonicPageModule.forChild(InStorePage),
    SharedModule
  ],
})
export class InStorePageModule {}
