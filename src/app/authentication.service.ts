import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private usersUrl = 'http://localhost:3000/usuarios'; // URL de tu JSON Server

  constructor(private http: HttpClient) {}

  getCurrentUserType(): string {
    return localStorage.getItem('userType') || '';
  }

  // Método para obtener el profesor actual
  getCurrentProfessor(): Observable<any> {
    const userId = localStorage.getItem('usuario');
    return this.http.get<any>(this.usersUrl).pipe(
      map(data => {
        const user = data.find((u: any) => u.id === userId && u.tipo === 'docente');
        return user || null;
      })
    );
  }

  // Método para obtener el estudiante actual
  getCurrentStudent(): Observable<any> {
    const userId = localStorage.getItem('usuario');
    return this.http.get<any>(this.usersUrl).pipe(
      map(data => {
        const user = data.find((u: any) => u.id === userId && u.tipo === 'estudiante');
        return user || null;
      })
    );
  }

  // Método para obtener las asignaturas del usuario actual (docente o estudiante)
  getCurrentUserAsignaturas(): Observable<any[]> {
    const userId = localStorage.getItem('usuario');
    return this.http.get<any>(this.usersUrl).pipe(
      map(data => {
        const user = data.find((u: any) => u.id === userId);
        return user ? user.materias : [];
      })
    );
  }
}