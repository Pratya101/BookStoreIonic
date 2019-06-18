import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the BillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
})
export class BillPage {
  public image : string;
  public isSelected : boolean 		=	false;
  private _SUFFIX : string;
  sellid : any;
  userid : any;
  MYIP : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    public appCtrl: App,
    private _ALERT       : AlertController,
    private _IMAGES 		: ImagesProvider) {
      this.getip();
    this.sellid = this.navParams.get("idsell");
    this.userid = this.navParams.get("userid");
  }

  

  getip(){
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
this.MYIP =  val ;
      console.log('MYTP : ' + this.MYIP);
    });
  }
 

  selectFileToUpload(event) : void
   {
     let idsell = this.sellid;
      this._IMAGES
      .handleImageSelection(event,idsell)
      .subscribe((res) =>
      {

         // Retrieve the file type from the base64 data URI string
         this._SUFFIX 			= res.split(':')[1].split('/')[1].split(";")[0];


         // Do we have correct file type?
         if(this._IMAGES.isCorrectFileType(this._SUFFIX))
         {

            // Hide the file input field, display the image in the component template
            // and display an upload button
            this.isSelected 	= true
            this.image 			= res;
         }

         // If we don't alert the user
         else
         {
            this.displayAlert('กรุณาใส่ไฟล์ที่เ็นนามสกุล: jpg, gif หรือ png');
         }
      },
      (error) =>
      {
         console.dir(error);
         this.displayAlert(error.message);
      });
   }

   /**
    * @public
    * @method uploadFile
    * @description    			Handles uploading the selected image to the remote PHP script
    * @return {none}
    */
   uploadFile() : void
   {
      this._IMAGES
      .uploadImageSelection(this.image,
                            this._SUFFIX)
      .subscribe((res) =>
      {
         this.displayAlert(res.message);
      },
      (error : any) =>
      {
         console.dir(error);
         this.displayAlert(error.message);
      });
      this.navCtrl.pop();
   }

   /**
    * @public
    * @method displayAlert
    * @param message  {string}  The message to be displayed to the user
    * @description    			Use the Ionic AlertController API to provide user feedback
    * @return {none}
    */
   displayAlert(message : string) : void
   {
      let alert : any   = this._ALERT.create({
         title 		: 'Heads up!',
         subTitle 	: message,
         buttons 	: ['OK']
      });
      alert.present();
      this.appCtrl.getRootNav().setRoot(TabsPage,{userid:this.userid});
   }
}
