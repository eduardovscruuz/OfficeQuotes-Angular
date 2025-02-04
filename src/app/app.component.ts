import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  ActivatedRoute,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedLanguage: 'en' | 'pt' = 'en'; // Inicializado com 'en'

  constructor(private router: Router, private route: ActivatedRoute) {
    // Monitora mudanças nos parâmetros da rota filha
    this.route.firstChild?.params.subscribe((params) => {
      const lang = params['language'];
      const id = params['id'];
      this.selectedLanguage = lang;

      // Verifica se o idioma é válido
      if (lang === 'en' || lang === 'pt') {
        this.selectedLanguage = lang; // Atualiza o idioma selecionado
      } else {
        // Redireciona para o idioma padrão (en) mantendo o ID da quote
        const redirectUrl = id ? ['en', id] : ['en'];
        console.log('Redirecionando para:', redirectUrl);
        this.router.navigate(redirectUrl);
      }
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.selectedLanguage = this.router.url.split('/')[1] as 'en' | 'pt';
      });
  }

  newLang(language: 'en' | 'pt') {
    const currentUrl = this.router.url.split('/');
    const id = currentUrl.length > 2 ? currentUrl[2] : null;
    this.selectedLanguage = language; // Atualiza o idioma selecionado

    if (id) {
      this.router.navigate([language, id]); // Mantém o ID da quote
    } else {
      this.router.navigate([language]); // Vai para a home
    }
  }
}
