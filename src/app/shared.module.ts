import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';

  

@NgModule({
  imports: [
    IonicPageModule.forChild(TabsPage),
    


  
  ],
  declarations: [TabsPage],
  
  exports: [TabsPage]

}) export class SharedModule {} 