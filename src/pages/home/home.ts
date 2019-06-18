import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { DetailPage } from '../../pages/detail/detail';
import { SellPage } from '../sell/sell';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isAndroid: boolean = false;
  search:any;
  datalist:any;
  dataall : any;
  tpye:string ="";
  index:any;
  boookid : any;
  userid : any;
  MYIP : any;
    constructor(public navCtrl: NavController,public navParams: NavParams,public http: Http,platform: Platform,public alertCtrl: AlertController,public events: Events,private storage: Storage) {
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
      this.MYIP =  val ;
      if(val){
        this.getBookall();
      }
      console.log('MYTP : ' + this.MYIP);
    });
    this.userid = this.navParams.get("userid");
    this.isAndroid = platform.is('android');
  }


  gotoDetail(){
    this.navCtrl.push(DetailPage,{boookid:this.boookid,userid:this.userid});
    console.log('ID' + this.boookid);
  }

  gotosell(){
    this.navCtrl.push(SellPage,{idbook:this.boookid,userid : this.userid})
  }

   getBooklist(){
    let datasearch = this.search;
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {btypeid:this.tpye};
    this.http.post('http://'+this.MYIP+'/webservice/getBook.php',body,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        //มีข้อมูล
        this.datalist = data.json()[1].dbresult;
       
        console.log("booKtypeid: "+data.json()[1].dbresult[0].booKtypeid);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }

   getBookall(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    this.http.post('http://'+this.MYIP+'/webservice/getBookall.php',null,options)
    .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus =="0"){
        //ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){
        //มีข้อมูล
        this.dataall = data.json()[1].dbresult;
        console.log("booKtypeid: "+data.json()[1].dbresult[0].booKtypeid);
              
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }
}
