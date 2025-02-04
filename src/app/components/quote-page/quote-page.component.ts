import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { BlackContainerComponent } from '../black-container/black-container.component';
import { QuoteComponent } from '../quote/quote.component';
import { English } from '../language-switcher/languages/english';
import { Portuguese } from '../language-switcher/languages/portuguese';

@Component({
  selector: 'app-quote-page',
  standalone: true,
  imports: [CommonModule, BlackContainerComponent, QuoteComponent],
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss'],
})
export class QuotePageComponent {
  quoteText = '';
  quoteAuthor = '';
  currentLanguage!: 'en' | 'pt';
  generateOtherBtn!: string;
  copyBtn!: string;
  currentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService
  ) {
    this.route.params.subscribe((params) => {
      this.currentLanguage = params['language'];
      this.currentId = +params['id'];
      this.loadQuote();
      this.updateTexts();
    });
  }

  private loadQuote() {
    this.quoteService
      .getCurrentQuote(this.currentId, this.currentLanguage)
      .subscribe((data) => {
        this.quoteText = `"${data.quote}"`;
        this.quoteAuthor = `— ${data.character}`;
      });
  }

  private updateTexts() {
    const langClass =
      this.currentLanguage === 'en' ? new English() : new Portuguese();
    this.copyBtn = langClass.copyBtn;
    this.generateOtherBtn = langClass.generateOtherBtn;
  }

  generateQuote() {
    this.quoteService.getRandomQuote(this.currentLanguage).subscribe((data) => {
      this.router.navigate([this.currentLanguage, data.id]);
    });
  }

  copyQuoteToClipboard() {
    const quote = `${this.quoteText} ${this.quoteAuthor}`;
    navigator.clipboard.writeText(quote);
  }

  backArrow() {
    this.router.navigate([this.currentLanguage]);
  }
}
