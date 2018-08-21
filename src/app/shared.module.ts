import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MymodalComponent } from '../components/mymodal/mymodal';
import { HeaderComponent } from '../components/header/header';
import { ChunkPipe } from '../pipes/chunk/chunk';
import { TruncatePipe } from '../pipes/truncate/truncate';
import { FilterPipe } from '../pipes/filter/filter';
import { SortPipe } from '../pipes/sort/sort';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SafehtmlPipe } from '../pipes/safehtml/safehtml';
import { LazyLoadImageModule } from 'ng-lazyload-image';


import { HapenningsProvider } from '../providers/hapennings/hapennings';
import { ExceptionHandlerProvider } from '../providers/exception-handler/exception-handler';
import { NetworkProvider } from '../providers/network/network';
import { LoaderProvider } from '../providers/loader/loader';
import { AlertProvider } from '../providers/alert/alert';
import { PushProvider } from '../providers/push/push';




@NgModule({
  imports: [
    IonicPageModule.forChild(TabsPage),
    IonicPageModule.forChild(MymodalComponent),
    IonicPageModule.forChild(HeaderComponent),
    IonicPageModule.forChild(ChunkPipe),
    IonicPageModule.forChild(SortPipe),
    IonicPageModule.forChild(SafehtmlPipe),
    IonicPageModule.forChild(TruncatePipe),
    IonicPageModule.forChild(FilterPipe),
    IonicImageViewerModule,

   
  ],
  declarations: [TabsPage,MymodalComponent,HeaderComponent,ChunkPipe,SortPipe,SafehtmlPipe,TruncatePipe,FilterPipe],
  exports: [TabsPage, MymodalComponent, HeaderComponent, ChunkPipe, SortPipe, IonicImageViewerModule, SafehtmlPipe,LazyLoadImageModule,TruncatePipe,FilterPipe],
  providers:[HapenningsProvider,ExceptionHandlerProvider,NetworkProvider,LoaderProvider,AlertProvider,PushProvider]
})

export class SharedModule { } 