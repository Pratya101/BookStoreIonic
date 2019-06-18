import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { BillPage } from '../bill/bill';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {
  idbook : any;
  datasell : any;
  userid : any;
  datasellcus : any; 
  amount : any = 1 ;
  bookamount:any;
  price : any;
  sum : any;
  sellstatus : any=0;
  sellbill : any =0;
  selid : any;
  newsellid : any;
  sumamount : any;
  pic:any="assets/imgs/";
  picture :any;  
  test:any;
  MYIP : any;



  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public appCtrl: App,public alertCtrl: AlertController,private storage: Storage) {
    this.getip();
    this.idbook = this.navParams.get("idbook");
this.userid = this.navParams.get("userid");

}
plus(){
  if(this.amount < 1){
    this.amount=1
  }else{
    this.amount = this.amount+1
  }
}

del(){
  if(this.amount < 1){
    this.amount=1
  }else{
    this.amount = this.amount-1
  }
}


getip(){
  this.storage.get('IP').then((val) => {
    console.log('Your IP is', val);
this.MYIP =  val ;
if(val){
this.getDetail();
this.getdatauser()
this.getsellid();
}
    console.log('MYTP : ' + this.MYIP);
  });
}

  getDetail(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {bid:this.idbook};
    this.http.post('http://'+ this.MYIP +'/webservice/getDetail.php',body,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        this.datasell = data.json()[1].dbresult;
        console.log("booKtypeid: "+data.json()[1].dbresult[0].bookid);
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }


  getdatauser(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {userid:this.userid};
    this.http.post('http://'+ this.MYIP +'/webservice/getsellcus.php',body,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        this.datasellcus = data.json()[1].dbresult;
        this.picture = data.json()[1].dbresult[0].userPic;
        this.test = this.pic+this.picture;
        console.log("booKtypeid: "+data.json()[1].dbresult[0].bookid);
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }

checkamount(){
  if (this.amount==null){
    this.showAlertamount();
  }else{
    if(this.bookamount<this.amount){
      this.showAlertNotamount();
      this.amount=null;
    }else{
       this.showAlert();
    }
   
  }
}

  showAlertamount() {
    const alert = this.alertCtrl.create({
      title: 'ไม่สาทำรายการ !',
      subTitle: 'กรรุณา ใส่ จำนวน ด้วยครับ !',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertNotamount() {
    const alert = this.alertCtrl.create({
      title: 'ไม่สาทำรายการ !',
      subTitle: 'จำนวนในสต๊อกน้อยกว่าจำนวนสั่งซื้อ !',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert() {
    this.sum = parseFloat(this.amount)*parseFloat(this.price)
    const confirm = this.alertCtrl.create({
      title: 'ราคารวม :' + this.sum,
      message: 'จำนวนที่สั่ง : '+this.amount+' เล่ม'+' คุณต้องการที่จะซื้อในราคานี้ใช่หรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('ไม่ซื้อ');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.sumamount=parseFloat(this.bookamount)-parseFloat(this.amount);
            this.UpdateAmount();
            this.setinsert();
           console.log("123456"+this.sum);
          }
        }
      ]
    });
    confirm.present();
  }


getsellid(){
  let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    this.http.post('http://'+ this.MYIP +'/webservice/getSellid.php',options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        //มีข้อมูล
        this.selid = data.json()[1].dbresult[0].sellid;
        this.newsellid = parseInt(this.selid)+1;
        console.log("newellid: "+this.newsellid);
        console.log("booKtypeid: "+data.json()[1].dbresult[0].bookid);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
}


  setinsert(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {sellid:this.newsellid,userid:this.userid,selltolal:this.sum,bookid:this.idbook,sellamount:this.amount,sellbill:this.sellbill,sellstatus:this.sellstatus};   
    this.http.post('http://'+ this.MYIP +'/webservice/setInsertSell.php',body,options)
    .subscribe(data=>{
      //console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus=="1"){
        this.showAlertSeccess();
        //ข้อแจ้งเตือน หรือ จะไปด้วย push setroot
      }else{
        //ข้อแจ้งเตือน  insert ไม่ได้
      }
    },error=>{
      console.log("error");
    })
  }

  UpdateAmount(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {sellamount:this.sumamount,bookid:this.idbook};   
    this.http.post('http://'+ this.MYIP +'/webservice/UpdateAmount.php',body,options)
    .subscribe(data=>{
      //console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus=="1"){
                //ข้อแจ้งเตือน หรือ จะไปด้วย push setroot
      }else{
        //ข้อแจ้งเตือน  insert ไม่ได้
      }
    },error=>{
      console.log("error");
    })
  }
 
   showAlertSeccess() {
    const alert = this.alertCtrl.create({
      title: 'สำเร็จ !',
      subTitle: 'คุณได้ทำการสั่งสินค้าเรียบร้อยเเล้ว',
      buttons: ['OK']
    });
    alert.present();
    this.gotopay();
  }

  gotopay(){
    this.appCtrl.getRootNav().setRoot(TabsPage,{userid:this.userid});
  }

 }
