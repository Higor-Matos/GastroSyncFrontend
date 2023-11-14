// total-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-card',
  templateUrl: './totalcard.component.html',
  styleUrls: ['./totalcard.component.scss'],
})
export class TotalCardComponent {
  @Input() total: number | undefined;
}
