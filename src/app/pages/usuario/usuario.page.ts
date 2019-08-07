import { BluetoothService, StorageService, FirebaseService } from './../../providers/providers';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  nick: string="";
  name: string="";
  surname: string="";
  level: string="";
  instrument: string="";
  user: any;

  constructor(  private firebase: FirebaseService,
                private navCtrl: NavController) { }

  ngOnInit() {

  this.firebase.getUser();
    
  }


  sendData(){
    this.firebase.postUser(this.name, this.surname, this.level, this.instrument);

    this.navCtrl.navigateRoot("/controles");
  }

  getUserData(){
  
    //this.nick = this.firebase.user.data().nick;
    
    this.name = this.firebase.name;
    this.surname = this.firebase.surname;
    this.level = this.firebase.level;
    this.instrument = this.firebase.instrument;

  }

}
