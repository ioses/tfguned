import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { Measure } from '../models/measure';


@Injectable()
export class FirebaseService{

    public measure: Measure;

    constructor(){
        
    }

    post(measure1, measure2, event_clicked){
        firebase.firestore().collection("posts").add({
          user: firebase.auth().currentUser.uid,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          measure1: measure1,
          measure2:measure2,
          event_clicked: event_clicked

        }).then((doc)=>{
          console.log(doc);
          //Actualiza los datos
       //   this.getPosts();
    
        }).catch((err)=>{
          console.log(err);
        })
      }

}