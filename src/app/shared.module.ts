import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MymodalComponent } from '../components/mymodal/mymodal';
import { FilterPipe } from '../pipes/filter/filter';
import { TruncatePipe } from '../pipes/truncate/truncate';

@NgModule({
  imports: [
    IonicPageModule.forChild(TabsPage),
    IonicPageModule.forChild(MymodalComponent),
    IonicPageModule.forChild(FilterPipe),
    IonicPageModule.forChild(TruncatePipe)
  ],
  declarations: [TabsPage,MymodalComponent, FilterPipe, TruncatePipe],
  exports: [TabsPage, MymodalComponent, FilterPipe, TruncatePipe]
})

export class SharedModule { } 