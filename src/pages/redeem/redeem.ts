import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { RewardsProvider } from '../../providers/rewards/rewards';
import JsBarcode from 'jsbarcode';
import { AlertProvider } from '../../providers/alert/alert';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';

@IonicPage()
@Component({
  selector: 'page-redeem',
  templateUrl: 'redeem.html',
})
export class RedeemPage {
  @ViewChild('redeem')redeemModal;
  @ViewChild('ActiveVoucher')voucherModal;
  @ViewChild('barcode') barcode: ElementRef;
  redeemList:any = [];
  selectedTab:any ='New';
  currentDate:any = moment().format('YYYY-MM-DD');

 
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loaderProvider:LoaderProvider,
              public rewardsProvider:RewardsProvider,
              public alertProvider:AlertProvider,
              public expnHandler:ExceptionHandlerProvider) {

                    let data = navParams.get('redeemData');

                    if(data){

                      this.redeemList = data.Vouchers;

                      this.redeemList.sort(this.sortByExpiryDate);

                      console.log(this.redeemList);
                }
    
            }



  redeemMyReward(){

    this.cancelRedeem()
    this.loaderProvider.presentLoadingCustom();
     let voucher = this.redeemList.filter(data =>data.ActivateStatus == 0).shift();
     this.rewardsProvider.claimMyVoucher(voucher.VoucherId).subscribe(res=>{
      this.loaderProvider.dismissLoader();

       if(res[0].code == 200){
         
       console.log(res);
       JsBarcode(this.barcode.nativeElement, res[0].data[0].VoucherId);
       this.voucherModal.open()
       
      }
      else{

        this.alertProvider.presentToast(res[0].message);

      }


     },error=>{

          this.loaderProvider.dismissLoader();

          this.expnHandler.excpHandler(error);


     })
    


  }


  cancelRedeem(){

    this.redeemModal.close();

  }

  openModel(){

    this.redeemModal.open();

  }


  sortByExpiryDate( a, b){

     if(a.ExpiryDate > b.ExpiryDate) return 1;

      return -1;
  }

}
