import { BluetoothService, StorageService, FirebaseService, ComunService } from './../../providers/providers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.page.html',
  styleUrls: ['./historicos.page.scss'],
})
export class HistoricosPage implements OnInit {

  private textoPrueba="Hola Mundo";

  private titles: any []= [];
  private titlesUnicos: any []= [];

  grabacionEscogida;

  constructor(private bluetooth: BluetoothService,
              private storage: StorageService,
              private firebase: FirebaseService,
              private comun: ComunService) { }

  ngOnInit() {
    this.firebase.getTitles();

  }

  getTitles(){
  this.titles=this.firebase.titles;

    console.log("Longitud en historicos: "+this.titles.length);

   let n= 0;

   for(n=0; n<this.titles.length;n++){
     console.log("Titulos: "+this.titles[n]);
   }

   let i=0;
   let j=0;

   for(i=0;i<this.titles.length;i++){
     for(j=0;j<this.titles.length;j++){
       if(i!=j){
         if(this.titles[i]==this.titles[j]){
           this.titles[i]="";
         }
       }
     }
   }

   for(i=0;i<this.titles.length;i++){
     if(this.titles[i]!=""){
       this.titlesUnicos.push(this.titles[i]);
     }
   }


   for(n=0; n<this.titlesUnicos.length;n++){
    console.log("Titulos unicos: "+this.titlesUnicos[n]);
  }


  }



}
