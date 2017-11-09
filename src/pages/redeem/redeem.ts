import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { RewardsProvider } from '../../providers/rewards/rewards';
import JsBarcode from 'jsbarcode';
import { AlertProvider } from '../../providers/alert/alert';
import { ExceptionHandlerProvider } from '../../providers/exception-handler/exception-handler';
import { ProfileProvider } from '../../providers/profile/profile';

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
  newRedeemList:any = [];
  selectedTab:any ='New';
  currentDate:any = moment().format('YYYY-MM-DD');
  experienceId:any;

 
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loaderProvider:LoaderProvider,
              public rewardsProvider:RewardsProvider,
              public alertProvider:AlertProvider,
              public profileProvider:ProfileProvider,
              public expnHandler:ExceptionHandlerProvider) {

                    let data = navParams.get('redeemData');

                    if(data){

                      this.redeemList = data.Vouchers;


                      this.redeemList.sort(this.sortByExpiryDate);
                      this.experienceId = this.redeemList[0].ExperienceId;

                }
    
            }



  redeemMyReward(){

          this.cancelRedeem();

          this.loaderProvider.presentLoadingCustom();

          let voucher = this.redeemList.filter(data =>data.ActivateStatus == 0).shift();
          
                this.loaderProvider.dismissLoader();
                JsBarcode(this.barcode.nativeElement, voucher.VoucherId);
                this.voucherModal.open();
       
      }

      getMyLatestRewards(){

            this.loaderProvider.presentLoadingCustom();

            this.voucherModal.close();

            this.profileProvider.getAllRedeemedVouchers()

                  .subscribe(res =>{

                            if(res[0].code == 200){

                            
                            this.newRedeemList = res[0].customer_vouchers;
                            let myList =  this.newRedeemList.filter(data=>data.ExperienceId == this.experienceId )
                            this.redeemList = myList;
                            console.log(this.redeemList);
                            this.loaderProvider.dismissLoader();

                            }else{

                              this.loaderProvider.dismissLoader();
                              this.alertProvider.presentToast(res[0].message);

                            }

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
