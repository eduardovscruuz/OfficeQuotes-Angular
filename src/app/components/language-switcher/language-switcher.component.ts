import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  @Input() currentLanguage!: string;
  @Output() languageSelected = new EventEmitter<'en' | 'pt'>();

  selectLanguage(language: 'en' | 'pt') {
    this.languageSelected.emit(language);
  }
}
