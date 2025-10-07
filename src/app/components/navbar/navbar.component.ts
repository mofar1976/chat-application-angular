import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, SharedModule],
  template: `
    <div
      class=" p-ai-center p-p-3 border-bottom surface-50 flex flex-row justify-content-start align-items-center"
    >
      <div class="p-text-bold">{{ 'TITLE' | translate }}</div>
      <div>
        <p-selectbutton
          [options]="stateOptions"
          [(ngModel)]="value"
          (ngModelChange)="onLangChange($event)"
          optionLabel="label"
          optionValue="value"
          aria-labelledby="basic"
          class="bg-primary"
        ></p-selectbutton>
      </div>
      <div class="ml-auto">
        <p-selectbutton
          [options]="themeOptions"
          [(ngModel)]="themeValue"
          (ngModelChange)="onThemeChange($event)"
          optionLabel="label"
          optionValue="value"
          aria-labelledby="theme"
        ></p-selectbutton>
      </div>
    </div>
  `,
  styles: [``],
})
export class NavbarComponent {
  stateOptions: any[] = [
    { label: 'EN', value: 'en' },
    { label: 'DE', value: 'de' },
  ];

  value: string = 'en';
  currentLang = 'en';
  themeOptions: any[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];
  themeValue: string = 'light';
  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('app_lang');
    this.currentLang =
      saved ||
      this.translate.currentLang ||
      this.translate.getDefaultLang() ||
      'en';
    this.value = this.currentLang;
    this.translate.use(this.currentLang);
    // initialize theme from localStorage
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    this.themeValue = savedTheme;
    this.applyTheme(savedTheme);
  }

  onLangChange(lang: string) {
    if (!lang) return;
    this.translate.use(lang);
    this.currentLang = lang;
    this.value = lang;
    localStorage.setItem('app_lang', lang);
  }

  onThemeChange(theme: string) {
    if (!theme) return;
    this.themeValue = theme;
    localStorage.setItem('app_theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: string) {
    try {
      const themeLink = document.getElementById('theme-link') as HTMLLinkElement | null;
      if (!themeLink) return;
      const lightHref = 'https://unpkg.com/primeng/resources/themes/lara-light-indigo/theme.css';
      const darkHref = 'https://unpkg.com/primeng/resources/themes/lara-dark-indigo/theme.css';
      themeLink.href = theme === 'dark' ? darkHref : lightHref;
      if (theme === 'dark') {
        document.body.classList.add('app-dark-theme');
      } else {
        document.body.classList.remove('app-dark-theme');
      }
    } catch (e) {
      // ignore in non-browser environments
      console.warn('Failed to apply theme', e);
    }
  }
}
