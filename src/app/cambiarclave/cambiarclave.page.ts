import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiRestService } from './apirest.service';
ApiRestService

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage {
  claveActual: string = '';
  nuevaClave: string = '';
  confirmarClave: string = '';

  constructor(
    private alertController: AlertController,
    private apiRestService: ApiRestService
  ) {}

  async cambiarClave() {
    if (!this.claveActual || !this.nuevaClave || !this.confirmarClave) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.nuevaClave !== this.confirmarClave) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La nueva contraseña y la confirmación no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const datosClave = {
      claveActual: this.claveActual,
      nuevaClave: this.nuevaClave,
    };

    this.apiRestService.cambiarClave(datosClave).subscribe(
      async (response) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'La clave ha sido cambiada correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
        this.claveActual = '';
        this.nuevaClave = '';
        this.confirmarClave = '';
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo cambiar la clave. Intenta nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}