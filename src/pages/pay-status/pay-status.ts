import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { Location } from '@angular/common';
import { SelldetailPage } from '../selldetail/selldetail';
import { Storage } from '@ionic/storage';

/**
/**
 * Generated class for the PayStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-status',
  templateUrl: 'pay-status.html',
})
export class PayStatusPage {
  userid : any;
  dataPay : any;
  billstatus : any;
  sellstatus : any;
  detailStatus : any;
  sellid : any;
  MYIP : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private location: Location,private storage: Storage) {
    this.getip();
    this.userid = this.navParams.get("userid");
   
   
  }
  getip(){
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
this.MYIP =  val ;
if(val){
  this.getdatauser(); 
}
      console.log('MYTP : ' + this.MYIP);
    });
  }

getdatauser(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {userid:this.userid};
    this.http.post('http://'+ this.MYIP +'/webservice/Cus_PayStatus.php',body,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        this.dataPay = data.json()[1].dbresult;
       console.log("booKtypeid: "+data.json()[1].dbresult[0].userid);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
}

CheckStatus(){
    if(this.billstatus=="1" && this.sellstatus=="1"){
      this.showAlerOK();
    }else if(this.billstatus=="1" && this.sellstatus=="0"){
      this.showAlerWait();
    }else{
      this.showAlerPay();
    }
}

showAlerOK() {
    const alert = this.alertCtrl.create({
      title: 'สินค้าถูกจัดส่งเเล้วค่ะ',
      subTitle: 'กรุณาณารอบรับสินค้าภายใน 3-7 วันค่ะ',
      buttons: ['OK']
    });
    alert.present();
}

showAlerWait() {
    const alert = this.alertCtrl.create({
      title: 'รอการอนุมัติ',
      subTitle: 'กรุณาณารอการอนุมัติการสั่งซื้อสินค้าภายใน 24 ชั่วโมง',
      buttons: ['OK']
    });
    alert.present();
}

showAlerPay() {
    const alert = this.alertCtrl.create({
      title: 'ยังไม่ได้เเจ้งชำระเงิน',
      subTitle: 'กรุณาไปเเจ้งชำระหน้าที่หน้าเเจ้งชำระเงินด้วยค่ะ',
      buttons: ['OK']
    });
    alert.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PayStatusPage');
  }


  goSellDetail(){
    this.navCtrl.push(SelldetailPage,{sellid : this.sellid})
  }

}
