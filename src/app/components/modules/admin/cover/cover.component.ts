// Nome do arquivo: cover.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';

import { ThemeService, ThemeType } from '../../../services/tema/theme.service';
import { CoverService } from '../../../services/cover/cover.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss', './button.config.scss'],
})
export class CoverComponent implements OnInit, OnDestroy {
  coverName: string = 'Blue Pen';
  coverImageUrl: string = 'https://i.imgur.com/5jMg4wp.png';
  coverActive: boolean = false;
  valorCover: number = 0;
  private themeSubscription: Subscription;

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private el: ElementRef,
    private coverService: CoverService,
    private toastService: ToastService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.themeSubscription = new Subscription();
    this.themeSubscription = new Subscription();
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (theme: ThemeType) => {
        this.renderer.removeClass(this.el.nativeElement, ThemeType.Light);
        this.renderer.removeClass(this.el.nativeElement, ThemeType.Dark);
        this.renderer.addClass(this.el.nativeElement, theme);
        console.log('CoverComponent inicializado.');
      }
    );

    const initialTheme = this.themeService.getCurrentThemeClass();
    this.renderer.addClass(this.el.nativeElement, initialTheme);

    this.getStatusCover();
  }

  getStatusCover() {
    this.coverService.getStatusCover().subscribe((response) => {
      this.coverActive = response.data.isCoverAtivo;
      this.valorCover = response.data.valorCover;
      console.log('Status do cover recebido:', response.data);
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleCoverStatus() {
    this.coverService.toggleCoverStatus(!this.coverActive).subscribe(() => {
      this.coverActive = !this.coverActive;
      const message = this.coverActive ? 'Cover ativado.' : 'Cover desativado.';
      this.toastService.showToast(message);
    });
  }
}
