// toast.service.ts
import { Injectable, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from '../../shared/config/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastRef!: OverlayRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  showToast(message: string, duration: number = 3000): void {
    this.closeToast();

    const positionStrategy = this.overlay
      .position()
      .global()
      .bottom('20px')
      .right('20px');

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: false,
      panelClass: 'toast-panel',
      disposeOnNavigation: true,
    });

    this.toastRef = this.overlay.create(overlayConfig);

    const injector = Injector.create({
      providers: [{ provide: 'toastMessage', useValue: message }],
      parent: this.parentInjector,
    });

    const toastPortal = new ComponentPortal(ToastComponent, null, injector);
    const componentRef: ComponentRef<ToastComponent> =
      this.toastRef.attach(toastPortal);
    componentRef.instance.show = true;

    setTimeout(() => this.closeToast(), duration);
  }

  private closeToast(): void {
    if (this.toastRef) {
      this.toastRef.dispose();
    }
  }
}
