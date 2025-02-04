import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-black-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './black-container.component.html',
  styleUrls: ['./black-container.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(3%)',
        })
      ),
      transition(':enter', [
        animate(
          '0.6s 200ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
    ]),
  ],
})
export class BlackContainerComponent {}
