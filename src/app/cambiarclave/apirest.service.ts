import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/'; 

  constructor(private http: HttpClient) {}

  cambiarClave(datosClave: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiar-clave`, datosClave);
  }
}