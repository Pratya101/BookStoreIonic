import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ManagerPage } from '../pages/manager/manager';
import { DetailPage } from '../pages/detail/detail';
import { SellPage } from '../pages/sell/sell';
import { Camera } from '@ionic-native/camera';
import { BillPage } from '../pages/bill/bill'
import { ImagesProvider } from '../providers/images/images';
import { DetailpayPage } from '../pages/detailpay/detailpay';
import { PayStatusPage } from '../pages/pay-status/pay-status';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs'
import { ListNoPayPage } from '../pages/list-no-pay/list-no-pay';
import { SelldetailPage } from '../pages/selldetail/selldetail';
import { StarRatingModule } from 'ionic3-star-rating';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [   
    MyApp,
    LoginPage,
    HomePage,
    ManagerPage,
    DetailPage,
    SellPage,
    BillPage,
    DetailpayPage,
    PayStatusPage,
    ProfilePage,
    TabsPage,
    ListNoPayPage,
    SelldetailPage,
    
  

  ],
  imports: [
    BrowserModule,
    HttpModule, 
    HttpClientModule,
    StarRatingModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    LoginPage,
    HomePage,
    ManagerPage,
    DetailPage,
    SellPage,
    BillPage,
    DetailpayPage,
    PayStatusPage,
    ProfilePage,
    TabsPage,
    ListNoPayPage,
    SelldetailPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagesProvider,
  ]
})
export class AppModule {}
