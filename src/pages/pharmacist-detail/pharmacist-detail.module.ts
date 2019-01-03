import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacistDetailPage } from './pharmacist-detail';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    PharmacistDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacistDetailPage),
    SharedModule
  ],
})
export class PharmacistDetailPageModule {}
