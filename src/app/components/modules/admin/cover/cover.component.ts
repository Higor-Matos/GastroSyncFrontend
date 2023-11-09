// Nome do arquivo: cover.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { ThemeService, ThemeType } from '../../../services/tema/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit, OnDestroy {
  coverName: string = 'Blue Pen';
  coverImageUrl: string = 'https://i.imgur.com/5jMg4wp.png';
  coverActive: boolean = false;
  private themeSubscription: Subscription;

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.themeSubscription = new Subscription();
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (theme: ThemeType) => {
        this.renderer.removeClass(this.el.nativeElement, ThemeType.Light);
        this.renderer.removeClass(this.el.nativeElement, ThemeType.Dark);
        this.renderer.addClass(this.el.nativeElement, theme);
      }
    );

    // Set initial theme
    const initialTheme = this.themeService.getCurrentThemeClass();
    this.renderer.addClass(this.el.nativeElement, initialTheme);
  }

  toggleCoverStatus() {
    this.coverActive = !this.coverActive;
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
