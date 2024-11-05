import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApirestService } from './apirest.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';   // Propiedad para el nombre de usuario
  password: string = '';   // Propiedad para la contraseña
  loading: boolean = false; // Propiedad para el estado de carga

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private apiService: ApirestService // Inyección del servicio
  ) {}

  async onSubmit() {
    this.loading = true; // Inicia la carga

    // Verifica las credenciales con el API
    this.apiService.login(this.username, this.password).subscribe(
      async (usuarios) => {
        if (usuarios.length > 0) {
          const loading = await this.loadingController.create({
            message: 'Iniciando sesión...',
          });
          await loading.present();

          setTimeout(async () => {
            await loading.dismiss();
            
            // Suponiendo que el primer usuario de la lista es el que se ha autenticado
            const usuario = usuarios[0];

            // Guardar el ID del usuario y las credenciales en localStorage
            localStorage.setItem('usuario', usuario.id.toString());
            localStorage.setItem('username', this.username); // Guardar nombre de usuario
            localStorage.setItem('password', this.password); // Guardar contraseña
            localStorage.setItem('isAuthenticated', 'true'); // Guarda el estado de autenticación

            this.router.navigate(['/pag-inicio']); // Redirige a la página de inicio
          }, 2000);
        } else {
          this.showToast('Credenciales incorrectas');
        }

        this.loading = false; // Finaliza la carga
      },
      async (error) => {
        this.showToast('Error en el servidor. Inténtalo más tarde.');
        this.loading = false; // Finaliza la carga
      }
    );
  }

  async resetPassword() {
    this.showToast('Funcionalidad de restablecimiento en desarrollo');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}