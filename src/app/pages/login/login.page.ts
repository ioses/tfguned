import { Component } from '@angular/core';
//import { ToastController } from 'ionic-angular';

import { NavController, ToastController} from '@ionic/angular';

import { SignupPage } from '../signup/signup.page';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})
export class LoginPage {

  email: string ="";
  password: string ="";

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController) {

  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user)=>{
      console.log(user)

      this.presentToast("Welcome"+user.user.displayName);

      this.navCtrl.navigateRoot('/controles');
     

    }).catch((err)=>{
      console.log(err)

      this.presentToast(err.message);
    })
  }

  gotoSignup(){
    this.navCtrl.navigateRoot('/signup');
  }

  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    await toast.present();
  }

}
