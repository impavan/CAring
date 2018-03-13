import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageViewPage } from './image-view';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ImageViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageViewPage),
    SharedModule
  ],
})
export class ImageViewPageModule {}
