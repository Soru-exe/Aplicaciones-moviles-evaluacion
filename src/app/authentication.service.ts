import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private usersUrl = 'jsonServer/db.json';  // Ruta hacia el archivo JSON unificado
  private currentStudent: any;
  private currentProfessor: any;

  constructor(private http: HttpClient) {
    // Al inicializar el servicio, intenta obtener el estado guardado en almacenamiento local
    const storedProfessor = localStorage.getItem('currentProfessor');
    if (storedProfessor) {
      this.currentProfessor = JSON.parse(storedProfessor);
    }

    const storedStudent = localStorage.getItem('currentStudent');
    if (storedStudent) {
      this.currentStudent = JSON.parse(storedStudent);
    }
  }

  // Método para obtener los usuarios por rol (docente o estudiante)
  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((data: any) => data.usuarios.filter((user: any) => user.tipo === role)) // Filtra según el rol
    );
  }

  // Método para obtener el tipo de usuario actual (docente o estudiante)
  getCurrentUserType(): string {
    const storedProfessor = localStorage.getItem('currentProfessor');
    const storedStudent = localStorage.getItem('currentStudent');
    if (storedProfessor) return 'docente';
    if (storedStudent) return 'estudiante';
    return '';  // Si no hay usuario almacenado, retorna vacío
  }

  // Métodos para gestionar los estudiantes
  setCurrentStudent(student: any): void {
    this.currentStudent = student;
    localStorage.setItem('currentStudent', JSON.stringify(student));
  }

  getCurrentStudent(): any {
    return this.currentStudent;
  }

  // Métodos para gestionar los docentes
  setCurrentProfessor(professor: any): void {
    this.currentProfessor = professor;
    localStorage.setItem('currentProfessor', JSON.stringify(professor));
  }

  getCurrentProfessor(): any {
    return this.currentProfessor;
  }
}