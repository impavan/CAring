import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertProvider {

  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  //alert
  presentAlert(title, subTitle, buttons, cssClass) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons,
      cssClass: cssClass
    });
    alert.present();
  }

  //confirm
  presentConfirm(title, message, buttons, cssClass) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons,
      cssClass: cssClass
    });
    alert.present();
  }

  //toast with delay 5 seconds delay
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }
}