import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ECartPage } from './e-cart';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ECartPage,
  ],
  imports: [
    IonicPageModule.forChild(ECartPage),
    SharedModule
  ],
})
export class ECartPageModule {}
