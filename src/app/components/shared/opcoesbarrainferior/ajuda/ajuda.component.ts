// ajuda.component.ts
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
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.scss'],
})
export class AjudaComponent implements OnInit, OnDestroy {
  private themeSubscription: Subscription = new Subscription();

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

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

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
