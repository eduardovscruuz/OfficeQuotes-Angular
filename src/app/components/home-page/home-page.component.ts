import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { English } from '../language-switcher/languages/english';
import { Portuguese } from '../language-switcher/languages/portuguese';
import { BlackContainerComponent } from '../black-container/black-container.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BlackContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  title!: string;
  text1!: string;
  text2!: string;
  generateBtn!: string;
  currentLanguage: 'en' | 'pt' = 'en';

  constructor(
    private router: Router,
    private quoteService: QuoteService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.currentLanguage = params['language'];
      this.updateTexts();
    });
  }

  private updateTexts() {
    const langClass =
      this.currentLanguage === 'en' ? new English() : new Portuguese();
    this.title = langClass.title;
    this.text1 = langClass.text1;
    this.text2 = langClass.text2;
    this.generateBtn = langClass.generateBtn;
  }

  generateQuote() {
    this.quoteService.getRandomQuote(this.currentLanguage).subscribe((data) => {
      this.router.navigate([this.currentLanguage, data.id]);
    });
  }
}
