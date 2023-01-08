import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather/weather.service';
import { City } from '../../models/city/city.model';
import { Weather } from '../../models/weather/weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  @Input() city!: City;
  currentCity!: City;
  weatherDetails!: Weather;
  isDay!: boolean;
  isLoading: boolean = true;

  constructor( private weatherService: WeatherService ) {}
  ngOnChanges() {
    if(this.city) {
      this.getWeatherDetails();
      this.currentCity = this.city;
    }
  }

  getWeatherDetails() {
    this.isLoading = true;
    this.weatherService.getWeatherByLatitudeAndLongitude(this.city.latitude, this.city.longitude, this.city.timezone)
      .subscribe( (response) => {
        console.log('weather details', response);
        this.weatherDetails = response;
        this.checkIsDay()
        if(this.isDay) this.weatherDetails.weathercode = this.weatherDetails.weathercode + 'd';
        else this.weatherDetails.weathercode = this.weatherDetails.weathercode + 'n';
        this.isLoading = false;
      },
      (err) => console.log('getWeatherDetails', err),
      () => {})
  }

  checkIsDay() {
    
    const currentDate = new Date(this.weatherDetails.time)
    const currentHour = currentDate.getHours();
    console.log('checkIsDay', currentHour)
    if(currentHour > 6 && currentHour < 18 ) {this.isDay = true;}
    else this.isDay = false;
  }
}
