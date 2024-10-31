
import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.page.html',
  styleUrls: ['./mis-asistencias.page.scss'],
})
export class MisAsistenciasPage {
  // Lista de asignaturas disponibles
  asignaturas: string[] = ['Programación Avanzada', 'Bases de Datos', 'Redes y Comunicaciones'];

  // Variable para almacenar la asignatura seleccionada
  asignaturaSeleccionada: string = '';

  // Lista completa de asistencias
  asistencias: { alumno: string; asignatura: string; fecha: string; estado: string }[] = [
    { alumno: 'Juan Pérez', asignatura: 'Programación Avanzada', fecha: '2024-09-15', estado: 'Presente' },
    { alumno: 'María García', asignatura: 'Bases de Datos', fecha: '2024-09-14', estado: 'Ausente' },
    { alumno: 'Luis Torres', asignatura: 'Redes y Comunicaciones', fecha: '2024-09-13', estado: 'Presente' },
    { alumno: 'Ana López', asignatura: 'Programación Avanzada', fecha: '2024-09-15', estado: 'Ausente' },
  ];

  // Lista de asistencias filtradas según la asignatura seleccionada
  asistenciasFiltradas: { alumno: string; asignatura: string; fecha: string; estado: string }[] = [];

  constructor() {}

  // Filtrar asistencias según la asignatura seleccionada
  filtrarAsistencias() {
    if (this.asignaturaSeleccionada) {
      this.asistenciasFiltradas = this.asistencias.filter(
        asistencia => asistencia.asignatura === this.asignaturaSeleccionada
      );
    } else {
      this.asistenciasFiltradas = [];
    }
  }
}