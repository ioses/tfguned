import { Component } from '@angular/core';
import { BluetoothService, StorageService, FirebaseService } from './../../providers/providers';
//import { NavParams, AlertController } from 'ionic-angular';

import { NavController, ToastController, AlertController, NavParams} from '@ionic/angular';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.page.html',
})
export class SignupPage {

  name: string="";
  email: string="";
  password: string="";

  constructor(public navCtrl: NavController, 
             // public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public firebase: FirebaseService) {
  }

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(
      (data)=>{

        console.log(data)

        let newUser: firebase.User = data.user;
        newUser.updateProfile({
          displayName: this.name,
          photoURL : ""
        }).then((res)=>{
          console.log("Profile updated")

          this.PresentAlertBluetooth();

        })
    }).catch((err)=>{
        console.log(err)
        
        this.presentToast(err.message);
    })
  }

  goBack(){
    this.navCtrl.navigateBack('/login');
  }


  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    await toast.present();
  }

  async PresentAlertBluetooth(){
    const alert = await this.alertCtrl.create({
      message: "Your account has been created succesfully",
      buttons: [
        {
          text: "OK",
          handler: () =>{
            
            //Crear un record para crear la tabla
            this.firebase.postFirst();
            this.firebase.postUserFirst(this.name);

            this.navCtrl.navigateRoot('/controles');
          }
        }
      ]
    });
    await alert.present();
  }

}
