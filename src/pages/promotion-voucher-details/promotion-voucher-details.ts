import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import JsBarcode from 'jsbarcode';



@IonicPage()
@Component({
  selector: 'page-promotion-voucher-details',
  templateUrl: 'promotion-voucher-details.html',
})
export class PromotionVoucherDetailsPage {

  @ViewChild('barcodeModal')barcodeModal;
  @ViewChild('barcode') barcode: ElementRef;
  voucherData: any;
  constructor(private navParams: NavParams) {

    this.voucherData = navParams.get('voucherdata');
    console.log(this.voucherData,"voucherdata");

  }
  ionViewDidEnter() {

    JsBarcode(this.barcode.nativeElement, this.voucherData.vouchercode);
    
  }

  // redeemNow() {

  //   JsBarcode(this.barcode.nativeElement, this.voucherData.vouchercode);
  //   this.barcodeModal.open();
    
  // }

  closeModal() {
    this.barcodeModal.close();
  }

  

}
