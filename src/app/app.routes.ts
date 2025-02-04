import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { QuotePageComponent } from './components/quote-page/quote-page.component';

export const routes: Routes = [
  {
    path: ':language',
    children: [
      { path: '', component: HomePageComponent },
      { path: ':id', component: QuotePageComponent },
    ],
  },
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  { path: '**', redirectTo: 'en' },
];
