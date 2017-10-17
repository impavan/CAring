import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MymodalComponent } from '../components/mymodal/mymodal';

  

@NgModule({
  imports: [
    IonicPageModule.forChild(TabsPage),
    IonicPageModule.forChild(MymodalComponent),
    


  
  ],
  declarations: [TabsPage, MymodalComponent],
  
  exports: [TabsPage, MymodalComponent]

}) export class SharedModule {} 