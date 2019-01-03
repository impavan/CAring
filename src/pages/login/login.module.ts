import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared.module';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    SharedModule
  ],
})
export class LoginPageModule {}
