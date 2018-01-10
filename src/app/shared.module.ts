import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MymodalComponent } from '../components/mymodal/mymodal';
import { FilterPipe } from '../pipes/filter/filter';
import { TruncatePipe } from '../pipes/truncate/truncate';
import { HeaderComponent } from '../components/header/header';
import { RoundPipe } from '../pipes/round/round';
import { ChunkPipe } from '../pipes/chunk/chunk';
import { SortPipe } from '../pipes/sort/sort';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SafehtmlPipe } from '../pipes/safehtml/safehtml';




@NgModule({
  imports: [
    IonicPageModule.forChild(TabsPage),
    IonicPageModule.forChild(MymodalComponent),
    IonicPageModule.forChild(FilterPipe),
    IonicPageModule.forChild(TruncatePipe),
    IonicPageModule.forChild(HeaderComponent),
    IonicPageModule.forChild(RoundPipe),
    IonicPageModule.forChild(ChunkPipe),
    IonicPageModule.forChild(SortPipe),
    IonicPageModule.forChild(SafehtmlPipe),
    IonicImageViewerModule
   
  ],
  declarations: [TabsPage,MymodalComponent, FilterPipe, TruncatePipe,HeaderComponent, RoundPipe,ChunkPipe,SortPipe,SafehtmlPipe],
  exports: [TabsPage, MymodalComponent, FilterPipe, TruncatePipe,HeaderComponent, RoundPipe,ChunkPipe,SortPipe,IonicImageViewerModule,SafehtmlPipe]
})

export class SharedModule { } 