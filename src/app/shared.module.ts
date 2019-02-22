import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MymodalComponent } from '../components/mymodal/mymodal';
import { ModalComponent } from '../components/modal/modal';
import { HeaderComponent } from '../components/header/header';
import { ChunkPipe } from '../pipes/chunk/chunk';
import { SortPipe } from '../pipes/sort/sort';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SafehtmlPipe } from '../pipes/safehtml/safehtml';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SafeurlPipe } from '../pipes/safeurl/safeurl';

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
    IonicPageModule.forChild(ModalComponent),
    IonicPageModule.forChild(HeaderComponent),
    IonicPageModule.forChild(ChunkPipe),
    IonicPageModule.forChild(SortPipe),
    IonicPageModule.forChild(SafehtmlPipe),
    IonicPageModule.forChild(SafeurlPipe),
    IonicImageViewerModule,
  ],
  declarations: [TabsPage, MymodalComponent, ModalComponent, HeaderComponent, ChunkPipe, SortPipe, SafehtmlPipe, SafeurlPipe],
  exports: [TabsPage, MymodalComponent, ModalComponent, HeaderComponent, ChunkPipe, SortPipe, IonicImageViewerModule, SafehtmlPipe, LazyLoadImageModule, SafeurlPipe],
  providers: [HapenningsProvider, ExceptionHandlerProvider, NetworkProvider, LoaderProvider, AlertProvider, PushProvider]
})

export class SharedModule { } 