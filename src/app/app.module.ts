import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicApp, IonicErrorHandler } from 'ionic-angular';

import { FormsModule } from '@angular/forms';

import {  IonicRouteStrategy, IonicModule } from '@ionic/angular'; 
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MyApp } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { LoginPage } from '../app/pages/login/login.page';
import { SignupPage } from '../app/pages/signup/signup.page';
import { HomePage } from '../app/pages/home/home.page';
//import { BluetoothPage } from '../app/pages/bluetooth/bluetooth.page';

import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './providers/storage/storage.service';

import { BluetoothService } from './providers/bluetooth/bluetooth.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FirebaseService } from './providers/firebase/firebase.service';

//import firebase from 'firebase';


import * as firebase from 'firebase/app';
import 'firebase/firestore';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}




var config = {
  apiKey: "AIzaSyDbx0lp59_rY1PhEdPORkAs8eWqaeuwrN0",
  authDomain: "iosestfg-47a04.firebaseapp.com",
  databaseURL: "https://iosestfg-47a04.firebaseio.com",
  projectId: "iosestfg-47a04",
  storageBucket: "iosestfg-47a04.appspot.com",
  messagingSenderId: "832321464220",
  appId: "1:832321464220:web:bea4a64459b57bcf"
};

firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true
});


@NgModule({
  declarations: [
    MyApp,
//    SignupPage,
 //   LoginPage,
    HomePage
 //   BluetoothPage
  ],
  entryComponents: [
    MyApp,
  //  SignupPage,
   // LoginPage,
    HomePage
    //BluetoothPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    BluetoothService,
    StorageService,
    FirebaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  bootstrap: [MyApp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
