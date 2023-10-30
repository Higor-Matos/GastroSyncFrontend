import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClientOptionsPanelComponent } from '../modules/ClientPanel/clientoptionspanel/client-options-panel.component';

@Injectable({
  providedIn: 'root',
})
export class ClientOptionsPanelService {
  constructor(private bottomSheet: MatBottomSheet) {}

  openClientOptions(): void {
    this.bottomSheet.open(ClientOptionsPanelComponent);
  }
}
