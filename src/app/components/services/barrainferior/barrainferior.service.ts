import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarraInferiorService {
  private _alturaBarraInferior = new BehaviorSubject<number>(0);
  alturaBarraInferior$ = this._alturaBarraInferior.asObservable();

  setAltura(altura: number) {
    this._alturaBarraInferior.next(altura);
  }
}
