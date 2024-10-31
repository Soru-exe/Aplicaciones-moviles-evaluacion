import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage {
  claveActual: string = '';
  nuevaClave: string = '';
  confirmarClave: string = '';

  constructor(private alertController: AlertController) {}

  async changePassword() {
    // Validación de campos vacíos
    if (!this.claveActual || !this.nuevaClave || !this.confirmarClave) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Detiene la ejecución si los campos están vacíos
    }

    // Validación de coincidencia de claves
    if (this.nuevaClave === this.confirmarClave) {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La clave ha sido cambiada correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las nuevas claves no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
