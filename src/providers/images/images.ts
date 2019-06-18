import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {
  billstatus :any=1;
  sellid:any;
  MYIP : any;
  IP: any = "127.0.0.1"
  private _READER : any  			=	new FileReader();
  private _REMOTE_URI : string 	=	"http://"+this.IP+"/webservice/parse-upload.php";
  constructor(public http: HttpClient,private storage: Storage) {
    this.storage.get('IP').then((val) => {
      console.log('Your IP is', val);
      this.MYIP =  val ;
      if(val){
        this.MYIP =  val ;
      }
      console.log('MYTP : ' + this.MYIP);
    });
    console.log('Hello ImagesProvider Provider');
    console.log(this.sellid);
    
  }

  handleImageSelection(event : any,idsell:any) : Observable<any>
   {
      let file 		: any 		= event.target.files[0];
      this.sellid = idsell
      this._READER.readAsDataURL(file);
      return Observable.create((observer) =>
      {
         this._READER.onloadend = () =>
         {
            observer.next(this._READER.result);
            observer.complete();
         }
      });
   }



   /**
    * @public
    * @method isCorrectFile
    * @param file  {String}     The file type we want to check
    * @description    			Uses a regular expression to check that the supplied file format
    *                 			matches those specified within the method
    * @return {any}
    */
   isCorrectFileType(file)
   {
      return (/^(gif|jpg|jpeg|png)$/i).test(file);
   }



   /**
    * @public
    * @method uploadImageSelection
    * @param file  		{String}    The file data to be uploaded
    * @param mimeType  	{String}    The file's MimeType (I.e. jpg, gif, png etc)
    * @description    				Uses the Angular HttpClient to post the data to a remote
    *                 				PHP script, returning the observable to the parent script
    * 								allowing that to be able to be subscribed to
    * @return {any}
    */
   uploadImageSelection(file 		: string,
                        mimeType 	: string) : Observable<any>
   {
      let headers 	: any		= new HttpHeaders({'Content-Type' : 'application/octet-stream'}),
          fileName  : any   = Date.now() + '.' + mimeType,
          options 	: any		= { "name" : fileName, "file" : file,"sellid":this.sellid,"status":this.billstatus };

      return this.http.post(this._REMOTE_URI, JSON.stringify(options), headers);
   }


}
