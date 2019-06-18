import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayStatusPage } from '../pay-status/pay-status';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import 'rxjs/add/operator/map';
import { AlertController, } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { Location } from '@angular/common';
import {LoginPage} from '../login/login';
import { BillPage } from '../bill/bill';
import { ListNoPayPage } from '../list-no-pay/list-no-pay';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PayStatusPage;
  tab3Root = ProfilePage;
  tab4Root = ListNoPayPage;
  userid : any;
  datasell : any;
  nopay : any;
  MYIP : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private storage: Storage) {
    this.getip();
    this.userid= this.navParams.get("userid");

 
  }

  getip(){
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
this.MYIP =  val ;
if(val){
  this.getamountsell();
  this.getamountNoPay();

}
      console.log('MYTP : ' + this.MYIP);
    });
  }

gotohomepage(){
  this.navCtrl.push(HomePage,{userid:this.userid});
}

Logout(){
this.navCtrl.setRoot(LoginPage);
console.log('Cancel');
}


showLogout() {
   const confirm = this.alertCtrl.create({
    title: 'Logout :',
    message: 'คุณต้องการที่จะออกจากระบบใช่หรือไม่',
    buttons: [
      {
        text: 'ยกเลิก',
        handler: () => {
          console.log('Cancel');
        }
      },
      {
        text: 'ยืนยัน',
        handler: () => {
          this.navCtrl.setRoot(LoginPage);
         console.log("LooutOK");
        }
      }
    ]
  });
  confirm.present();
}


getamountsell(){
  let headers = new Headers({'Content-Type':'application/json'});
  let options = new ResponseOptions({headers:headers});
  let body = {userid:this.userid};
  this.http.post('http://'+ this.MYIP +'/webservice/CountSell.php',body,options)
  .subscribe(data=>{
    console.log("apistatus:"+data.json()[0].apistatus);
    if(data.json()[0].apistatus =="0"){
      //ไม่มีข้อมูล
      console.log("ไม่มีข้อมูล");
    }else if(data.json()[0].apistatus =="1"){
      this.datasell = data.json()[1].dbresult[0].total;
     console.log("booKtypeid: "+data.json()[1].dbresult[0].userid);
            
    }else{
      console.log("มีข้อผิดพลาดที่ API");
    }
  },error=>{
    console.log("error");
  });
}

getamountNoPay(){
  let headers = new Headers({'Content-Type':'application/json'});
  let options = new ResponseOptions({headers:headers});
  let body = {userid:this.userid};
  this.http.post('http://'+ this.MYIP +'/webservice/CountNoPay.php',body,options)
  .subscribe(data=>{
    console.log("apistatus:"+data.json()[0].apistatus);
    if(data.json()[0].apistatus =="0"){
      //ไม่มีข้อมูล
      console.log("ไม่มีข้อมูล");
    }else if(data.json()[0].apistatus =="1"){
      this.nopay = data.json()[1].dbresult[0].total;
     console.log("booKtypeid: "+data.json()[1].dbresult[0].userid);
            
    }else{
      console.log("มีข้อผิดพลาดที่ API");
    }
  },error=>{
    console.log("error");
  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
