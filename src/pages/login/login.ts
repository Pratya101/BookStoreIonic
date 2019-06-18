import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { ManagerPage } from '../manager/manager';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
username : any; 
password : any; 
admin:any="admin"; 
userid : any; 
MYIP : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private storage: Storage) {
    storage.set('IP', '127.0.0.1');
    storage.get('IP').then((val) => { 
      console.log('Your IP is', val);
      this.MYIP =  val ; 
      console.log('MY IP : ' + this.MYIP);
    });
  }
 
  getlogin(){ 
    let headers = new Headers({'Content-Type':'application/json'}); 
    let options = new ResponseOptions({headers:headers});
    let body = {username:this.username,password:this.password};   
    this.http.post('http://'+ this.MYIP +'/webservice/getLogin.php',body,options) 
    .subscribe(data=>{
      if(data.json()[0].apistatus=="1"){
          if(this.admin==data.json()[1].dbresult[0].user_status){ 
            this.navCtrl.setRoot(ManagerPage);
          }else{
            this.userid = data.json()[1].dbresult[0].user_id; 
            this.navCtrl.setRoot(TabsPage,{userid:this.userid});
          }
      }else{//เเสดงว่าไม่มีข้อมูลมา
        this.showAlert();// 
        
      }
    },error=>{
      console.log("error");
    })
  }


  showAlert() {
    this.username = null;
    this.password = null;
    const alert = this.alertCtrl.create({
      title: 'Login Fail !',
      subTitle: 'กรุณาตรวจสอบ Username หรือ Password อีกครั้งครับ !',
      buttons: ['OK']
     
    });
    alert.present();
  }
  
}
