import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLocationPage } from './event-location';

@NgModule({
  declarations: [
    EventLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLocationPage),
  ],
})
export class EventLocationPageModule {}
