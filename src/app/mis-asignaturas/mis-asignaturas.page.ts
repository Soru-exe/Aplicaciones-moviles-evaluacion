import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage {
  asignaturas: { nombre: string; seccion: string; hora: string }[] = [
    { nombre: 'Programación Avanzada', seccion: 'P101', hora:'10:30' },
    { nombre: 'Bases de Datos', seccion: 'B102',  hora:'15:30' },
    { nombre: 'Redes y Comunicaciones', seccion: 'C201',  hora:'14:30' },
    { nombre: 'Programacion de bases de datos', seccion: 'PD501',  hora:'12:30' },
  ];

  constructor() {}

}