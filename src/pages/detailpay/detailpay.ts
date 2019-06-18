import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { ManagerPage } from '../manager/manager';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DetailpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailpay',
  templateUrl: 'detailpay.html',
})
export class DetailpayPage {
  DataCustomerSell : any;
  sellid: any;
  pic : any;
  picture : any;
  status :any =1;
  name : any;
  price : any;
  amount : any;
  total : any;
  fullid : any;
  bill : any;
  bookname : any;
  MYIP : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private storage: Storage) {
    this.getip();
    this.sellid = this.navParams.get("sellid");
    this.getDetail(); 
    
  }
  getip(){
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
this.MYIP =  val ;
if(val){
  this.getDetail();
}

      console.log('MYTP : ' + this.MYIP);
    });
  }



  getDetail(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {sellid:this.sellid};
    this.http.post('http://'+ this.MYIP +'/webservice/getSellName.php',body,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){

        //มีข้อมูล
        this.DataCustomerSell = data.json()[1].dbresult;
        this.name = data.json()[1].dbresult[0].nameuser + " "+ data.json()[1].dbresult[0].sername;
        this.bill ="S00"+ this.sellid;
        this.bookname = data.json()[1].dbresult[0].bookname;
        this.amount = data.json()[1].dbresult[0].bookamount;
        this.total = data.json()[1].dbresult[0].pricetotal;
        this.pic = data.json()[1].dbresult[0].pic;
        this.picture="assets/imgs/"+this.pic;
        console.log("booKtypeid: "+data.json()[1].dbresult[0].bookid);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailpayPage');
  }

  UpdateAmount(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {status:this.status,sellid:this.sellid};   
    this.http.post('http://'+ this.MYIP +'/webservice/UpdateStatus.php',body,options)
    .subscribe(data=>{
      //console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus=="1"){
        this.showAlertUpdate();
        this.gotoLisySell();
        //ข้อแจ้งเตือน หรือ จะไปด้วย push setroot
      }else{
        //ข้อแจ้งเตือน  insert ไม่ได้
      }
    },error=>{
      console.log("error");
    })
  }

  showAlertUpdate() {
    const alert = this.alertCtrl.create({
      title: 'เรียบร้อย',
      subTitle: 'ไทำการยืนการการสั่งซื้อเเล้วครับ',
      buttons: ['OK']
    });
    alert.present();
  }

  gotoLisySell(){
    this.navCtrl.setRoot(ManagerPage);
  }

 }
