import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from './messages';
import { SharedModule } from '../../app/shared.module';
import { SortdescPipe } from '../../pipes/sortdesc/sortdesc';


@NgModule({
  declarations: [
    MessagesPage,
    SortdescPipe
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage),
    SharedModule
  ],
})
export class MessagesPageModule {}
