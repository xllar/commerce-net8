import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'Angular';

  constructor(){

  }
  ngOnInit(): void {
   
  }
}
