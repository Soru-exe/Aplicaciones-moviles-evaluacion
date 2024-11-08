import { Component, OnInit } from '@angular/core';
import { ApirestService } from './apirest.service';
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
  asistenciaRegistrada: boolean = false;

  constructor(private authService: AuthenticationService, private apirestService: ApirestService) {}

  ngOnInit() {
    this.userType = this.authService.getCurrentUserType();

    if (this.userType === 'docente') {
      this.authService.getCurrentProfessor().subscribe((professor: any) => {
        this.currentProfessor = professor;
      });
    } else if (this.userType === 'estudiante') {
      this.authService.getCurrentStudent().subscribe((student: any) => {
        this.currentStudent = student;
      });
    }
  }

  // Genera los datos del QR según el tipo de usuario
  generateQRData(): string {
    if (this.userType === 'docente' && this.currentProfessor) {
      const materia = this.currentProfessor.materias[0].materia;
      const seccion = this.currentProfessor.materias[0].seccionActual;
      return `${this.currentProfessor.nombre} - ${materia} - Sección: ${seccion}`;
    } else if (this.userType === 'estudiante' && this.currentStudent) {
      return `${this.currentStudent.nombre} - Materia: ${this.currentStudent.materias[0].materia}`;
    }
    return '';
  }

  // Función para registrar la asistencia del estudiante
  registrarAsistencia() {
    const fecha = new Date().toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'

    this.apirestService.registrarAsistencia(
      this.currentStudent.id,
      this.currentStudent.materias[0].materia,
      fecha
    ).subscribe(
      (response) => {
        this.asistenciaRegistrada = true;
        console.log('Asistencia registrada con éxito:', response);
      },
      (error) => {
        console.error('Error al registrar la asistencia:', error);
      }
    );
  }
}