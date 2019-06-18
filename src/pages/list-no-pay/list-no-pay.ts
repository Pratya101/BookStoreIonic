import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { BillPage } from '../bill/bill';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ListNoPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-no-pay',
  templateUrl: 'list-no-pay.html',
})
export class ListNoPayPage {
  sellid : any;
listNoPay : any;
userid :any;
MYIP : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private storage: Storage) {
    this.getip();
    this.userid = this.navParams.get("userid");


  }

  getip(){
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
this.MYIP =  val ;
if(val){
  this. getListNoPay();
}
      console.log('MYTP : ' + this.MYIP);
    });
  }



  getListNoPay(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    this.http.post('http://'+ this.MYIP +'/webservice/getPay.php',options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        //มีข้อมูล
        this.listNoPay = data.json()[1].dbresult;
        console.log("booKtypeid: "+data.json()[1].dbresult[0].bookid);   
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }

gotoBill(){
  this.navCtrl.push(BillPage,{idsell:this.sellid,userid:this.userid});
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad ListNoPayPage');
  }

}
