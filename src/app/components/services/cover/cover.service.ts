import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CoverService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStatusCover(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Estabelecimento/StatusCover`);
  }

  toggleCoverStatus(ativar: boolean): Observable<any> {
    const action = ativar ? 'AtivarCover' : 'DesativarCover';
    return this.http.post<any>(`${this.apiUrl}/Estabelecimento/${action}`, {});
  }
}
