import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RewardsProvider } from '../../providers/rewards/rewards';
import JsBarcode from 'jsbarcode';

@IonicPage({
  segment: 'promotion-voucher-details/:id'
})
@Component({
  selector: 'page-promotion-voucher-details',
  templateUrl: 'promotion-voucher-details.html',
})

export class PromotionVoucherDetailsPage {
  @ViewChild('barcodeModal') barcodeModal;
  @ViewChild('barcode') barcode: ElementRef;
  voucherData: any;
  _id: string;

  constructor(private navParams: NavParams, private rewardsProvider: RewardsProvider) {
    this.voucherData = navParams.get('voucherdata');
    this._id = this.navParams.get('id');
    console.log(this._id, "this._id")
    if (this._id != null) {
      this.getAllPromotionsById(this._id);
    } else {
      console.log("no id")
      this.voucherData = navParams.get('voucherdata');
      console.log(this.voucherData, "this.voucherData")
    }
  }

  ionViewDidEnter() {
    if (this._id == null || this._id == undefined) {
      JsBarcode(this.barcode.nativeElement, this.voucherData.vouchercode);
    }
  }

  closeModal() {
    this.barcodeModal.close();
  }

  getAllPromotionsById(id) {
    this.rewardsProvider.getAllPromotionsById(id).subscribe(res => {
      console.log(res, "voucher from id")
      if (res.data == 200) {
        this.voucherData = res.data[0];
        console.log(this.voucherData, "voucher from id")
      }
      JsBarcode(this.barcode.nativeElement, this.voucherData.vouchercode);
    })
  }
}