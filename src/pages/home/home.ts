import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private zbar: ZBar, private barcodeScanner: BarcodeScanner, private transfer: FileTransfer, private file: File, private alertCtrl: AlertController, private santitizer: DomSanitizer) {
  }
  TestPage() {
    this.navCtrl.push('TestPage')

  }

  download() {
    this.alertCtrl.create({
      title: '更新版本',
      subTitle: '10% of battery remaining',
      enableBackdropDismiss: false,
      buttons: ['Dismiss']
    }).present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const apk = this.file.dataDirectory + 'coal.apk';

    /*  fileTransfer.onProgress((event: ProgressEvent) => {
       let num = Math.floor(event.loaded / event.total * 100);
       if (num === 100) {
 
       } else {
         let title = document.getElementsByClassName('alert-title')[0];
         title && (title.innerHTML = '下载进度：' + num + '%');
       }
     }); */
    fileTransfer.download('https://coalline.com/files/apks/plant0801.apk', apk).then((entry) => {
      /*  window.alert('download complete'+entry.toURL()); */
      /*  window['install'].install(apk.replace('file://', '')); */
      window['install'].install(apk.replace('file://', ''));
    });

    fileTransfer.onProgress((event: ProgressEvent) => {
      let num = Math.floor(event.loaded / event.total * 100);
      if (num <= 100) {
        let title = document.getElementsByClassName('alert-sub-title')[0];
        let html= this.santitizer.bypassSecurityTrustHtml("<progress value="+num+'%'+"max='100'></progress>")
        title && (title.innerHTML = '下载进度：' + num + '%');  

      }
    })

  }
}
