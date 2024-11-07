import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-inicio-estudiante',
  templateUrl: './pagina-inicio-estudiante.page.html',
  styleUrls: ['./pagina-inicio-estudiante.page.scss'],
})
export class PaginaInicioEstudiantePage {
  usuario: string = localStorage.getItem('username') || 'Usuario';

  constructor(private toastController: ToastController) {}

  async salir() {
    const toast = await this.toastController.create({
      message: 'Has cerrado sesión.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    localStorage.clear(); // Limpia la información de sesión
  }
}