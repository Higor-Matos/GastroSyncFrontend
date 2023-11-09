// Nome do arquivo: cover.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoverService {
  private apiUrl: string = 'https://localhost:8443/api/Estabelecimento';

  constructor(private http: HttpClient) {}

  getStatusCover(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/StatusCover`);
  }

  toggleCoverStatus(ativar: boolean): Observable<any> {
    const action = ativar ? 'AtivarCover' : 'DesativarCover';
    return this.http.post<any>(`${this.apiUrl}/${action}`, {});
  }
}
