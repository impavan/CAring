import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import JsBarcode from 'jsbarcode';
/**
 * Generated class for the PromotionVoucherDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotion-voucher-details',
  templateUrl: 'promotion-voucher-details.html',
})
export class PromotionVoucherDetailsPage {

  @ViewChild('barcodeModal') barcodeModal;
  @ViewChild('barcode') barcode: ElementRef;
  voucherData: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.voucherData = navParams.get('voucherdata');
  }

  ionViewDidEnter() {

    JsBarcode(this.barcode.nativeElement, this.voucherData.vouchercode);

  }
  closeModal() {
    this.barcodeModal.close();
  }

}
