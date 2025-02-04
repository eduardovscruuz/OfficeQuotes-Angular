import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private baseUrl =
    'https://randomquotesapi-dyezfmcngne2a7c8.brazilsouth-01.azurewebsites.net/api/quotes';

  constructor(private http: HttpClient) {}

  getRandomQuote(
    language: 'en' | 'pt',
    id?: number
  ): Observable<{ id: number; quote: string; character: string }> {
    const quoteId = id ?? Math.floor(Math.random() * 298) + 1;

    return this.http.get<{ id: number; quote: string; character: string }>(
      `${this.baseUrl}/${language}/${quoteId}`
    );
  }

  getCurrentQuote(
    id: number,
    language: 'en' | 'pt'
  ): Observable<{ id: number; quote: string; character: string }> {
    return this.http.get<{ id: number; quote: string; character: string }>(
      `${this.baseUrl}/${language}/${id}`
    );
  }
}
