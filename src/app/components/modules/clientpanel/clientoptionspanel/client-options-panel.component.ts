import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-client-options-panel',
  templateUrl: './client-options-panel.component.html',
})
export class ClientOptionsPanelComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ClientOptionsPanelComponent>
  ) {}

  doSomething(option: string): void {
    this.bottomSheetRef.dismiss();
  }
}
