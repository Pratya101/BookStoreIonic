import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SelldetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selldetail',
  templateUrl: 'selldetail.html',
})
export class SelldetailPage {
  sellid : any;
  DataCustomerSell : any;
  pic : any;
  picture : any;
  billstatus :any;
  sellstatus :any;
  chkbillstatus : any;
  chksellstatus :any;
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
    this.http.post('http://127.0.0.1/webservice/getSellName.php',body,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){

        //มีข้อมูล
        this.name = data.json()[1].dbresult[0].nameuser + " "+ data.json()[1].dbresult[0].sername;
        this.bill ="S00"+ this.sellid;
        this.bookname = data.json()[1].dbresult[0].bookname;
        this.amount = data.json()[1].dbresult[0].bookamount;
        this.total = data.json()[1].dbresult[0].pricetotal;
        this.pic = data.json()[1].dbresult[0].pic;
        this.billstatus =data.json()[1].dbresult[0].billstatus;
        if(this.billstatus == "1"){
          this.chkbillstatus = "เเจ้งชำระเงินเเล้ว";
        }else{
          this.chkbillstatus = "ยังไม่ได้เเจ้งชำระเงิน";
        }
        this.sellstatus =data.json()[1].dbresult[0].sellstatus;
        if(this.sellstatus == "1"){
          this.chksellstatus = "สินค้าถูกจัดส่งเเล้วค่ะ"
        }else{
          this.chksellstatus = "รอการอนุมัติ"
        }
        this.picture="assets/imgs/"+this.pic;
        console.log("status: "+data.json()[1].dbresult[0].sellstatus);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error"); 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelldetailPage');
  }

}
