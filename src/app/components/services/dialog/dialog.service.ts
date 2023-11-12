// dialog.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogOpenSource = new BehaviorSubject<boolean>(false);

  dialogOpen = this.dialogOpenSource.asObservable();

  setDialogOpen(isOpen: boolean): void {
    this.dialogOpenSource.next(isOpen);
  }
}
