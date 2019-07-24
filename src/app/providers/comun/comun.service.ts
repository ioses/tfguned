import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { Measure } from '../models/measure';

@Injectable()
export class ComunService{

    values=[];

    x1=[];
    y1=[];
    z1=[];
    x2=[];
    y2=[];
    z2=[];

    x1mean;
    y1mean;
    z1mean;
    x2mean;
    y2mean;
    z2mean;

    constructor(){}

    calibraSensores(data){
        let n=0;
        let p=0;
        while (n<15){
            n++;
            if(data!=""){
               this.splitCadena(data);
                this.x1[n]=this.values[0];
                this.y1[n]=this.values[1];
                this.z1[n]=this.values[2];
                this.x2[n]=this.values[3];
                this.y2[n]=this.values[4];
                this.z2[n]=this.values[5];
            }
        }

        //MEdia de cada uno de los elementos

    }


    splitCadena(data){
        this.values=data.split(',');
    }

    //Crear función que normalice los valores 

}