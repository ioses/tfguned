import { BluetoothService, StorageService, FirebaseService, ComunService } from './../../providers/providers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  //private captaciones: any[]=[];
  private eventos: any[]=[];

  private si=0;
  private numeroCaptaciones=0;

  constructor(    private bluetooth: BluetoothService,
                  private storage: StorageService,
                  private firebase: FirebaseService,
                  private comun: ComunService) { }

  ngOnInit() {

//    this.getEventRecorded();
  }

/*
  getEventRecorded(){
   this.eventos= this.firebase.getUltimaGrabacion(this.comun.getEventTitle);

    this.numeroCaptaciones=this.eventos.length;


  }
*/
}
