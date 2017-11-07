import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLocationPage } from './event-location';
import { SharedModule } from '../../app/shared.module';


@NgModule({
  declarations: [
    EventLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLocationPage),
    SharedModule
  ],
})
export class EventLocationPageModule {}
