import { Component, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-client-options-panel',
  templateUrl: './options-panel.component.html',
})
export class OptionsPanelComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<OptionsPanelComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { options: string[] }
  ) {}

  doSomething(option: string): void {
    this.bottomSheetRef.dismiss();
  }
}
