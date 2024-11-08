import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  asignaturas: { materia: string; secciones: string[] }[] = [];
  selectedAsignatura: { materia: string; secciones: string[] } | null = null;
  qrData: string = '';
  qrGenerado: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // Cargar las asignaturas del usuario actual
    this.authService.getCurrentUserAsignaturas().subscribe((asignaturas) => {
      this.asignaturas = asignaturas;
    });
  }

  // Generar datos para el QR basados en la asignatura seleccionada
  generarQR() {
    if (this.selectedAsignatura) {
      const materia = this.selectedAsignatura.materia;
      const secciones = this.selectedAsignatura.secciones.join(', ');
      this.qrData = `Asignatura: ${materia}, Secciones: ${secciones}`;
      this.qrGenerado = true;
    }
  }
}