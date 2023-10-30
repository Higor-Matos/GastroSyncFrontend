import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsPanelComponent } from '../modules/OptionsPanelComponent/options-panel.component';

@Injectable({
  providedIn: 'root',
})
export class ClientOptionsPanelService {
  options: string[] = [];

  constructor(private bottomSheet: MatBottomSheet, private router: Router) {
    this.router.events.subscribe(() => {
      this.setOptionsBasedOnRoute();
    });
  }

  private setOptionsBasedOnRoute(): void {
    const currentRoute = this.router.url;
    if (currentRoute.includes('admin')) {
      this.options = ['Admin Option 1', 'Admin Option 2'];
    } else {
      this.options = ['Client Option 1', 'Client Option 2'];
    }
  }

  openClientOptions(): void {
    this.bottomSheet.open(OptionsPanelComponent, {
      data: { options: this.options },
    });
  }
}
