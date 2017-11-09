import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MymodalComponent } from '../components/mymodal/mymodal';
import { FilterPipe } from '../pipes/filter/filter';
import { TruncatePipe } from '../pipes/truncate/truncate';
import { HeaderComponent } from '../components/header/header';
import { RoundPipe } from '../pipes/round/round';

@NgModule({
  imports: [
    IonicPageModule.forChild(TabsPage),
    IonicPageModule.forChild(MymodalComponent),
    IonicPageModule.forChild(FilterPipe),
    IonicPageModule.forChild(TruncatePipe),
    IonicPageModule.forChild(HeaderComponent),
    IonicPageModule.forChild(RoundPipe)
  ],
  declarations: [TabsPage,MymodalComponent, FilterPipe, TruncatePipe,HeaderComponent, RoundPipe],
  exports: [TabsPage, MymodalComponent, FilterPipe, TruncatePipe,HeaderComponent, RoundPipe]
})

export class SharedModule { } 