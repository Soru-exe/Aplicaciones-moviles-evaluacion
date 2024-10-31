import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async onSubmit() {
    if (this.username === 'Usuario1' && this.password === 'MiClav3') {
      this.navCtrl.navigateForward('/pag-inicio');
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }


  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      message: 'Se ha enviado un correo para restablecer tu contraseña.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

