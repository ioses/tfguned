import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { Measure } from '../models/measure';


@Injectable()
export class FirebaseService{

    public measure: Measure;
    event_number;
    event_number_1: number;
    events: any []=[];
    titles =[];

    name: string;
    surname: string;
    level: string;
    instrument: string;

    constructor(){
        
    }

    post(x1, y1, z1, x2, y2, z2, eventIzquierda, eventDerecha, textoControl, nuevaGrabacion, tipo){

        if(nuevaGrabacion == true){
          this.event_number =0;
        }

        this.event_number++;
        

        firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).add({
          event_number: this.event_number,
          measure_x1: x1,
          measure_y1: y1, 
          measure_z1: z1,
          measure_x2: x2, 
          measure_y2: y2,
          measure_z2: z2,
          title: "_"+textoControl,
          event_izquierda: eventIzquierda,
          event_derecha: eventDerecha,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          user: firebase.auth().currentUser.uid,
          tipo: tipo

        }).then((doc)=>{
          console.log(doc);
          //Actualiza los datos
       //   this.getPosts();
    
        }).catch((err)=>{
          console.log(err);
        })
      }

      postUser(name, surname, level, instrument){
        
        firebase.firestore().collection("users").where("user", "==", firebase.auth().currentUser.uid).get()
          .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
              firebase.firestore().collection("users").doc(doc.id).update({
                date: firebase.firestore.FieldValue.serverTimestamp(),
                name: name,
                surname: surname,
                level: level,
                instrument: instrument
              });
            });
          })


/*

        firebase.firestore().collection("users").add({
          user: firebase.auth().currentUser.uid,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          name: name,
          surname: surname,
          level: level,
          instrument: instrument
        }).then((doc)=>{
          console.log(doc);
        }).catch((err)=>{
          console.log(err);
        })
        */
      }

      getUser(){
        let query = firebase.firestore().collection("users").where('user','==',firebase.auth().currentUser.uid.toString()).limit(1);

     
    
        query.get().then((docs)=>{
        docs.forEach((doc)=>{

          this.name = JSON.stringify(doc.data().name);
          this.surname = JSON.stringify(doc.data().surname);
          this.level = JSON.stringify(doc.data().level);
          this.instrument = JSON.stringify(doc.data().instrument);

            console.log("getUser: "+this.instrument);
        })
        

      }).catch((err)=>{
        console.log(err)
      })


      }

      postUserFirst(nick){
        
        firebase.firestore().collection("users").add({
          user: firebase.auth().currentUser.uid,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          nick: nick,
          name:"",
          surname: "",
          level: "",
          instrument: ""
        }).then((doc)=>{
          console.log(doc);
        }).catch((err)=>{
          console.log(err);
        })
      }

    

      postFirst(){
      

        firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).add({
          event_number: 1,
          measure_x1: 0,
          measure_y1: 0, 
          measure_z1: 0,
          measure_x2: 0, 
          measure_y2: 0,
          measure_z2: 0,
          event_izquierda: false,
          event_derecha: false,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          user: firebase.auth().currentUser.uid

        }).then((doc)=>{
          console.log(doc);

    
        }).catch((err)=>{
          console.log(err);
        })
      }
/*
      getUltimaGrabacion(title){
        
        this.events = []
        //let query = firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).orderBy("event_number","desc").limit(1);
    
        let query = firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).where('title','==',"_"+title);

     
    
          query.get().then((docs)=>{
          docs.forEach((doc)=>{
            this.events.push(doc);
              
          })
          

        }).catch((err)=>{
          console.log(err)
        })

        return this.events;

      }
*/
      getTitles(){
        this.titles = []
       // let query = firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).orderBy("event_number","desc").limit(1);
    
        let query = firebase.firestore().collection(firebase.auth().currentUser.uid.toString()).orderBy("title","desc");


          query.get().then((docs)=>{
          docs.forEach((doc)=>{

            console.log("DOC: "+doc);
            var title = JSON.stringify(doc.data().title);
            console.log("Titulo: "+title+"Tipo: "+typeof(title));
            this.titles.push(title);

          })
    
              
        let n=0;
        for (n=0; n<this.titles.length;n++){
          console.log("Dentro si: "+this.titles[n]);
        }


        console.log("Longitud: "+this.titles.length);

        }).catch((err)=>{
          console.log(err)
        })

      }

      
    
}