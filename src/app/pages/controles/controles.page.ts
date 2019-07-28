import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.page.html',
  styleUrls: ['./controles.page.scss'],
})
export class ControlesPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {

  }

  manual(){
    this.navCtrl.navigateRoot("/manual");
  }

  automatico(){
    this.navCtrl.navigateRoot("/automatico");
  }

  

}
