import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-application';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');
    const saved = localStorage.getItem('app_lang') || 'en';
    this.translate.use(saved);
  }
}
