import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageViewPage } from './image-view';
import { SharedModule } from '../../app/shared.module';
import { ZoomProvider } from '../../providers/zoom/zoom';

@NgModule({
  declarations: [
    ImageViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageViewPage),
    SharedModule
  ],
  providers:[ZoomProvider]
})
export class ImageViewPageModule {}
