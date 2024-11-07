import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  private apiUrl = 'http://localhost:3000'; // URL de tu API JSON Server (ajusta según tu configuración)

  constructor(private http: HttpClient) { }

  // Método para obtener los datos de un docente o estudiante
  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  // Método para registrar la asistencia de un estudiante
  registrarAsistencia(idEstudiante: string, idMateria: string, fecha: string): Observable<any> {
    const asistenciaData = {
      idEstudiante,
      idMateria,
      fecha,
      estado: 'presente'  // Puedes agregar más datos si es necesario
    };
    return this.http.post(`${this.apiUrl}/asistencias`, asistenciaData);
  }

  // Método para obtener las asistencias de un estudiante por materia
  getAsistencias(idEstudiante: string, idMateria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/asistencias?estudianteId=${idEstudiante}&materiaId=${idMateria}`);
  }
}