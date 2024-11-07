import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage {
  scannedData: string | null = null;

  constructor(private barcodeScanner: BarcodeScanner) {}

  startScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        this.scannedData = barcodeData.text;
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}