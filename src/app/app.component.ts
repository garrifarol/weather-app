import { Component } from '@angular/core';
import { City } from './shared/models/city/city.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  city!: City;

  constructor() {
    console.log('test')
  }

  onSearch(event: any) {
    this.city = event
    console.log('inside app', this.city);
  }
}

