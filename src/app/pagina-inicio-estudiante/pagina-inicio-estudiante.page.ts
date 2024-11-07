import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-inicio-estudiante',
  templateUrl: './pagina-inicio-estudiante.page.html',
  styleUrls: ['./pagina-inicio-estudiante.page.scss'],
})
export class PaginaInicioEstudiantePage {
  scannedData: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController
  ) {}

  // Método para iniciar el escaneo del código de barras o QR
  startScanner() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedData = barcodeData.text;  // Almacena los datos escaneados
        this.showScanResult();
      },
      err => {
        console.log('Error al escanear', err);
        this.showErrorAlert();
      }
    );
  }

  // Muestra un mensaje de éxito con el contenido del código QR escaneado
  async showScanResult() {
    const alert = await this.alertController.create({
      header: 'Escaneo exitoso',
      message: `Contenido del QR: ${this.scannedData}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Muestra un mensaje de error en caso de fallo en el escaneo
  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se pudo escanear el código. Por favor, intenta nuevamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}