import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  qrGenerado: boolean = false;
  currentProfessor: any;
  currentStudent: any;
  userType: string = '';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // Determina el tipo de usuario
    this.userType = this.authService.getCurrentUserType();

    if (this.userType === 'docente') {
      this.currentProfessor = this.authService.getCurrentProfessor();
    } else if (this.userType === 'estudiante') {
      this.currentStudent = this.authService.getCurrentStudent();
    }
  }

  // Función para generar el QR según los datos del docente o estudiante
  generarQR() {
    this.qrGenerado = true;
  }

  // Función que decide qué datos poner en el QR dependiendo del tipo de usuario
  generateQRData(): string {
    if (this.userType === 'docente') {
      return `${this.currentProfessor?.nombre} - ${this.currentProfessor?.materias[0]?.materia} - ${this.currentProfessor?.materias[0]?.seccion[0]}`;
    } else if (this.userType === 'estudiante') {
      return `${this.currentStudent?.nombre} - ${this.currentStudent?.materias[0]?.materia}`;
    }
    return '';
  }
}