import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SellPage } from '../sell/sell';
import 'rxjs/add/operator/map';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
PrimaryId : any; 
datalist2 : any; 
userid : any;
MYIP : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private storage: Storage) {
    this.getip();
    this.PrimaryId=this.navParams.get("boookid");
    this.userid=this.navParams.get("userid");

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

  gotosell(){ 
    this.navCtrl.push(SellPage,{idbook:this.PrimaryId,userid : this.userid}) 
  }
   getDetail(){
    let headers = new Headers({'Content-Type':'application/json'}); 
    let options = new ResponseOptions({headers:headers}); 
    let body = {bid:this.PrimaryId}; 
    this.http.post('http://' + this.MYIP+ '/webservice/getDetail.php',body,options) 
    .subscribe(data=>{
      if(data.json()[0].apistatus =="0"){ 
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){

        this.datalist2 = data.json()[1].dbresult;           
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }
}
