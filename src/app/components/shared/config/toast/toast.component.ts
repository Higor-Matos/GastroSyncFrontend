// toast.component.ts
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  show: boolean = true;

  constructor(@Inject('toastMessage') public message: string) {}
}
