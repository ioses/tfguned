import { BluetoothService, StorageService, FirebaseService, ComunService } from './../../providers/providers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { send } from 'q';

@Component({
  selector: 'app-automatico',
  templateUrl: './automatico.page.html',
  styleUrls: ['./automatico.page.scss'],
})
export class AutomaticoPage implements OnInit {

  devices: any[] = [];
  showSpinner = false;
  isConnected = false;
  message = '';
  messages = [];
  textReceived ='';
  contadorCalibracion=0;
  calibra=false;
  correctorAutomatico = false;
  fin = false;
  arrayCalibra = [];
  eventsFirebase = [];
  event_number;

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private translate: TranslateService,
    private bluetooth: BluetoothService,
    private storage: StorageService,
    private firebase: FirebaseService,
    private comun: ComunService
  ) { }

  ngOnInit() {

 
 
    this.showSpinner = true;
    this.bluetooth.storedConnection().then((connected) => {
      this.isConnected = true;
      this.showSpinner = false;
      //Cambia de sendMessage('')
      this.sendMessage('prueba');
    }, (fail) => {
      this.bluetooth.searchBluetooth().then((devices: Array<Object>) => {
        this.devices = devices;
        this.showSpinner = false;
      }, (error) => {
        this.presentToast(this.translate.instant(error));
        this.showSpinner = false;
      });
    });
  }

    /**
   * Cierra la conexión bluetooth.
   */
  disconnect(): Promise<boolean> {
    return new Promise(result => {
      //Dja de envair mensajes
      this.sendMessage("g");
      this.isConnected = false;
      this.bluetooth.disconnect().then(response => {
        result(response);
      });
    });
  }

  ngOnDestroy() {
    this.disconnect();
  }

  /**
   * Busca los dispositivos bluetooth dispositivos al arrastrar la pantalla hacia abajo.
   * @param refresher
   */
  refreshBluetooth(refresher) {
    if (refresher) {
      this.bluetooth.searchBluetooth().then((successMessage: Array<Object>) => {
        this.devices = [];
        this.devices = successMessage;
        refresher.target.complete();
      }, fail => {
        this.presentToast(this.translate.instant(fail));
        refresher.target.complete();
      });
    }
  }
  /**
   * Verifica si ya se encuentra conectado a un dispositivo bluetooth o no.
   * @param seleccion Son los datos del elemento seleccionado  de la lista
   */
  checkConnection(seleccion) {
    this.bluetooth.checkConnection().then(async (isConnected) => {
      const alert = await this.alertCtrl.create({
        header: this.translate.instant('BLUETOOTH.ALERTS.RECONNECT.TITLE'),
        message: this.translate.instant('BLUETOOTH.ALERTS.RECONNECT.MESSAGE'),
        buttons: [
          {
            text: this.translate.instant('CANCEL'),
            role: 'cancel',
            handler: () => {}
          },
          {
            text: this.translate.instant('ACCEPT'),
            handler: () => {
              this.disconnect().then(() => {
                this.bluetooth.deviceConnection(seleccion.id).then(success => {
                  this.sendMessage('nada');
                  this.isConnected = true;
                  this.presentToast(this.translate.instant(success));
                }, fail => {
                  this.isConnected = false;
                  this.presentToast(this.translate.instant(fail));
                });
              });
            }
          }
        ]
      });
      await alert.present();
    }, async (notConnected) => {
      const alert = await this.alertCtrl.create({
        header: this.translate.instant('BLUETOOTH.ALERTS.CONNECT.TITLE'),
        message: this.translate.instant('BLUETOOTH.ALERTS.CONNECT.MESSAGE'),
        buttons: [
          {
            text: this.translate.instant('CANCEL'),
            role: 'cancel',
            handler: () => {}
          },
          {
            text: this.translate.instant('ACCEPT'),
            handler: () => {
              this.bluetooth.deviceConnection(seleccion.id).then(success => {
                this.sendMessage('nada');
                this.isConnected = true;
                this.presentToast(this.translate.instant(success));
              }, fail => {
                this.isConnected = false;
                this.presentToast(this.translate.instant(fail));
              });
            }
          }
        ]
      });
      await alert.present();
    });
  }
  /**
   * Permite enviar mensajes de texto vía serial al conectarse por bluetooth.
   */
  sendMessage(message: string) {
    this.bluetooth.dataInOut(`${message}\n`).subscribe(data => {
      if (data !== 'BLUETOOTH.NOT_CONNECTED') {
        try {
          if (data) {
            const entry = JSON.parse(data); //chequear los datos aqui y abajo
           this.addLine(data);
            this.textReceived=data;
          }
        } catch (error) {
          console.log(`[bluetooth-168]: ${JSON.stringify(error)}`);
        }
   //     this.presentToast(data); //aqui
         this.addLine(data);
          this.textReceived=data;
         // this.message = '';
      } else {
  //      this.presentToast(this.translate.instant(data));
      }
    });
  }

  receiveMessage(){
    this.bluetooth.dataOutIn().subscribe(data => {
      if(data !== 'BLUETOOTH.NOT_CONNECTED'){
        try{
          if(data){
            const entry = JSON.parse(data);
           this.addLine(data);
            this.textReceived = data;
          }
        }catch (error){
          console.log(`[bluetooth-168]: ${JSON.stringify(error)}`);
        }
      //  this.presentToast(data);
        this.addLine(data);
       this.textReceived = data;

      }else{
  //      this.presentToast(this.translate.instant(data));
      }
    });
  }

  /**
   * Recupera la información básica del servidor para las graficas de lineas.
   * @param message
   */
  addLine(message) {

    if(message!=="" && this.calibra==true && this.contadorCalibracion<=15){
      this.arrayCalibra.push(message);
      this.contadorCalibracion+=1;
    }

    if(this.contadorCalibracion==15 && this.calibra == true){
      //Funcion de envio de array calibracion
      this.sendMessage("g");
      this.comun.calibraSensores(this.arrayCalibra);
      this.calibra = false;
   
    }

    if(message!=="" && this.correctorAutomatico==true){
      this.comun.controlautomatico(message);

    }

    if(this.correctorAutomatico==false && this.fin==true){
      this.sendMessage("g");
      this.fin = false;
    }

/*
    if(message!=""){
      this.firebase.post(message, "testdesdefirebase", false);
    }
 */   
  }

  /**
   * Presenta un cuadro de mensaje.
   * @param {string} text Mensaje a mostrar.
   */
  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1000
    });
    await toast.present();
  }


  //Funcion de calibracion
  calibracion(){
    this.calibra = true;
    this.sendMessage("q");
  }

  comienzoautomatico(){
    this.correctorAutomatico = true;
    this.sendMessage("q");
  }

//Crear funcion que elija de manera automatizada la sensibilidad


  finautomatico(){
    
    this.correctorAutomatico=false;
    this.fin = true;
    this.sendMessage("g");
    

  // this.firebase.getEventNumber();

  }


}
