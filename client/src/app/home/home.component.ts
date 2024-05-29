import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  slides = [
    { image: 'assets/images/hero1.jpg', caption: 'Slide 1 Caption' },
    { image: 'assets/images/hero2.jpg', caption: 'Slide 2 Caption' },
    { image: 'assets/images/hero3.jpg', caption: 'Slide 3 Caption' }
  ];

}
