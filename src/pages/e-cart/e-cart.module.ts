import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ECartPage } from './e-cart';

@NgModule({
  declarations: [
    ECartPage,
  ],
  imports: [
    IonicPageModule.forChild(ECartPage),
  ],
})
export class ECartPageModule {}
