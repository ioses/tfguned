import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { Measure } from '../models/measure';


@Injectable()
export class FirebaseService{

    public measure: Measure;
    private event_number;
    events=[];

    constructor(){
        
    }

    post(x1, y1, z1, x2, y2, z2, event_clicked, new_event){

        if(new_event == true){
          this.getEventNumber();
          this.event_number=parseInt(this.event_number);
          this.event_number++;
        }

        firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).add({
          event_number: this.event_number,
          measure_x1: x1,
          measure_y1: y1, 
          measure_z1: z1,
          measure_x2: x2, 
          measure_y2: y2,
          measure_z2: z2,
          event_clicked: event_clicked,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          user: firebase.auth().currentUser.uid

        }).then((doc)=>{
          console.log(doc);
          //Actualiza los datos
       //   this.getPosts();
    
        }).catch((err)=>{
          console.log(err);
        })
      }

      postFirst(){

        firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).add({
          event_number: 0,
          measure_x1: 0,
          measure_y1: 0, 
          measure_z1: 0,
          measure_x2: 0, 
          measure_y2: 0,
          measure_z2: 0,
          event_clicked: false,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          user: firebase.auth().currentUser.uid

        }).then((doc)=>{
          console.log(doc);

    
        }).catch((err)=>{
          console.log(err);
        })
      }



      getEventNumber(){
        
        this.events = []
        let query = firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).orderBy("event_number","desc").limit(1);
    
          query.onSnapshot((snapshot)=>{
            let changedDocs = snapshot.docChanges();
    
            changedDocs.forEach((change)=>{
              if(change.type == "added"){
    
              }
    
              if(change.type == "modified"){
                
              }
    
              if(change.type == "removed"){
                
              }
            })
          })
    
          query.get().then((docs)=>{
          docs.forEach((doc)=>{
            this.event_number= doc.data().event_number;
              
          })
    
          console.log("Numero "+this.event_number);
        }).catch((err)=>{
          console.log(err)
        })

      }
    
}