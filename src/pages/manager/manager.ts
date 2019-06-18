import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { DetailpayPage } from '../detailpay/detailpay';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager',
  templateUrl: 'manager.html',
})
export class ManagerPage {
  datasellList : any;
  sellid : any;
  MYIP : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private storage: Storage) {
    this.getip();

    this.sellid = this.navParams.get("sellid")
    
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

  gotoDetailPay(){
    this.navCtrl.push(DetailpayPage,{sellid : this.sellid})
  }
  getDetail(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    this.http.post('http://'+ this.MYIP +'/webservice/getSell.php',options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        //มีข้อมูล
        this.datasellList = data.json()[1].dbresult;
      
       
        console.log("booKtypeid: "+data.json()[1].dbresult[0].bookid);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }

  Logout(){
    this.navCtrl.setRoot(LoginPage);
    console.log('Cancel');
    }
    
    showAlert() {
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
              this.Logout();
             console.log("LooutOK");
            }
          }
        ]
      });
      confirm.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerPage');
  }



}
