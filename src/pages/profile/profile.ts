import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
userid : any; 
name : any;
sername : any;
address : any;
tel : any;
pic :any ="assets/imgs/";
filePic : any;
getpicture:any;
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
  this.getdatauser();
}
      console.log('MYTP : ' + this.MYIP);
    });
  }

  getdatauser(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {userid:this.userid}; 
    this.http.post('http://'+ this.MYIP +'/webservice/getsellcus.php',body,options) 
    .subscribe(data=>{
      if(data.json()[0].apistatus =="0"){
        console.log("ไม่มีข้อมูล");
      }else if(data.json()[0].apistatus =="1"){ 
        this.name = data.json()[1].dbresult[0].userName; 
        this.sername = data.json()[1].dbresult[0].userSername;
        this.address = data.json()[1].dbresult[0].userAddress;
        this.tel = data.json()[1].dbresult[0].usertel;
        this.filePic = data.json()[1].dbresult[0].userPic;
        this.getpicture = this.pic + this.filePic;
      }else{
        console.log("มีข้อผิดพลาดที่ API");
      }
    },error=>{
      console.log("error");
    });
  }

  EditProfile(){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {userid:this.userid,name:this.name,sername:this.sername,address:this.address,tel:this.tel};    
    this.http.post('http://'+ this.MYIP +'/webservice/UpdateCustomer.php',body,options)
    .subscribe(data=>{
      //console.log("apistatus:"+data.json()[0].apistatus);
      if(data.json()[0].apistatus=="1"){
        this.showAlerOK();
      }else{
        console.log("มีข้อผิดพลาด");
      }
    },error=>{
      console.log("error");
    })
  }

  showAlerOK() {
    const alert = this.alertCtrl.create({
      title: 'สำเร็จ!',
      subTitle: 'ทำการแก้ไขข้อมูล Profile เรียบร้อยเเล้วค่ะ !',
      buttons: ['OK']
    });
    alert.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

 
  
}
