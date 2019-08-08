import { BluetoothService, StorageService, FirebaseService } from './../../providers/providers';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { Measure } from '../models/measure';

@Injectable()
export class ComunService{

    private values=[];
    private newRecord = false;
    private tituloGrabacion;

    private x1ArrayCalibra=[];
    private y1ArrayCalibra=[];
    private z1ArrayCalibra=[];
    private x2ArrayCalibra=[];
    private y2ArrayCalibra=[];
    private z2ArrayCalibra=[];

    private x1calibrado=0;
    private y1calibrado=0;
    private z1calibrado=0;
    private x2calibrado=0;
    private y2calibrado=0;
    private z2calibrado=0;

    private x1=0;
    private y1=0;
    private z1=0;
    private x2=0;
    private y2=0;
    private z2=0;

    eventoIzquierda = false;
    eventoDerecha = false;
    contadorEventosAutomaticos = 0;

    constructor(    
            private firebase: FirebaseService,
            private toastCtrl: ToastController,
            private bluetooth: BluetoothService
        ){

            this.newRecord = true;

        }
        

    calibraSensores(ArrayCalibra){
        let n=0;
        let p=0;
        this.x1ArrayCalibra=[];
        this.y1ArrayCalibra=[];
        this.z1ArrayCalibra=[];
        this.x2ArrayCalibra=[];
        this.y2ArrayCalibra=[];
        this.z2ArrayCalibra=[];
        
          for(n=0;n<ArrayCalibra.length;n++){
                this.splitCadena(ArrayCalibra[n]);
                this.x1ArrayCalibra[n]=parseInt(this.values[0]);
                this.y1ArrayCalibra[n]=parseInt(this.values[1]);
                this.z1ArrayCalibra[n]=parseInt(this.values[2]);
                this.x2ArrayCalibra[n]=parseInt(this.values[3]);
                this.y2ArrayCalibra[n]=parseInt(this.values[4]);
                this.z2ArrayCalibra[n]=parseInt(this.values[5]);  
        }
        //MEdia de cada uno de los elementos

        let sumax1 = this.x1ArrayCalibra.reduce((previous, current)=> current += previous);
        this.x1calibrado = Math.floor(sumax1/this.x1ArrayCalibra.length);
        
        let sumay1 = this.y1ArrayCalibra.reduce((previous, current)=> current += previous);
        this.y1calibrado = Math.floor(sumay1/this.y1ArrayCalibra.length);

        let sumaz1 = this.z1ArrayCalibra.reduce((previous, current)=> current += previous);
        this.z1calibrado = Math.floor(sumaz1/this.z1ArrayCalibra.length);

        let sumax2 = this.x2ArrayCalibra.reduce((previous, current)=> current += previous);
        this.x2calibrado = Math.floor(sumax2/this.x2ArrayCalibra.length);

        let sumay2 = this.y2ArrayCalibra.reduce((previous, current)=> current += previous);
        this.y2calibrado = Math.floor(sumay2/this.y2ArrayCalibra.length);

        let sumaz2 = this.z2ArrayCalibra.reduce((previous, current)=> current += previous);
        this.z2calibrado = Math.floor(sumaz2/this.z2ArrayCalibra.length);
        

    }

    //Añadir entrada para sensibilidad de deteccion automática
    controlautomatico(data, nuevaGrabacion, textoControl,sensibilidad){
        this.splitCadena(data);

        this.x1=this.values[0]-(this.x1calibrado);
        this.y1=this.values[1]-(this.y1calibrado);
        this.z1=this.values[2]-(this.z1calibrado);
        this.x2=this.values[3]-(this.x2calibrado);
        this.y2=this.values[4]-(this.y2calibrado);
        this.z2=this.values[5]-(this.z2calibrado);


        if( this.x1 > sensibilidad || this.x1<-(sensibilidad) ||
            this.y1 > sensibilidad || this.y1<-(sensibilidad) ||
            this.z1 > sensibilidad || this.z1<-(sensibilidad)
             ){
                this.eventoIzquierda=true;
        } else if(            
            this.x2 > sensibilidad || this.x2<-(sensibilidad) ||
            this.y2 > sensibilidad || this.y2<-(sensibilidad) ||
            this.z2 > sensibilidad || this.z2<-(sensibilidad)){

                this.eventoDerecha=true;
        }

        if (nuevaGrabacion == true){
            this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, false, false, textoControl, true, "automatico");

        }else{
            if((this.eventoIzquierda == true || this.eventoDerecha == true) && this.contadorEventosAutomaticos ==3){
                if(this.eventoIzquierda== true){
                    this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, true, false, textoControl, false, "automatico");
                    this.contadorEventosAutomaticos=0;
                    this.eventoIzquierda=false;    
                }else if( this.eventoDerecha == true){
                    this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2,false, true, textoControl, false, "automatico");
                    this.contadorEventosAutomaticos=0;
                    this.eventoDerecha = false;
                }
            }else{
                if((this.eventoIzquierda == true || this.eventoDerecha == true) && this.contadorEventosAutomaticos<3){
                   this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, false, false, textoControl, false, "automatico");
                    this.contadorEventosAutomaticos++;
                }else{
                    this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, false, false, textoControl, false, "automatico");
                    this.eventoDerecha=false;
                    this.eventoIzquierda=false;

                }
            }
        }
        this.tituloGrabacion = textoControl;

    }

    
    controlmanual(data, eventoIzquierda, eventoDerecha, nuevaGrabacion, textoControl){
        this.splitCadena(data);

        this.x1=this.values[0]-(this.x1calibrado);
        this.y1=this.values[1]-(this.y1calibrado);
        this.z1=this.values[2]-(this.z1calibrado);
        this.x2=this.values[3]-(this.x2calibrado);
        this.y2=this.values[4]-(this.y2calibrado);
        this.z2=this.values[5]-(this.z2calibrado);


        if (nuevaGrabacion == true){
            this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, false, false, textoControl, true, "manual");
           // this.newRecord = false;
        }else{
            if(eventoIzquierda == true){
                this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, true, false, textoControl, false, "manual");
            }else if(eventoDerecha == true){
                this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, false, true, textoControl, false, "manual");
            }
            else{
                this.firebase.post(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, false, false, textoControl, false, "manual");
            }
            
        }

    }
/*
    getEventoAutomatico(){
        return this.eventoAutomatico;
    }
*/


    splitCadena(data){
        this.values=data.split(',');
    }

    getEventTitle(){
        return this.tituloGrabacion;
    }

}