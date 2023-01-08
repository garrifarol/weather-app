import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from 'src/app/shared/models/weather/weather.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiBaseURL = 'https://api.open-meteo.com';

  constructor(
    private http: HttpClient
  ) { }

  getWeatherByLatitudeAndLongitude(latitude: number, longitude: number, timezone: string) {
    const url = `${this.apiBaseURL}/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current_weather=true`;
    console.log(`URL: ${url}`);
    return this.http.get(url)
      .pipe( map((value: any) => {
        console.log('getWeatherByLatitudeAndLongitude()', value);
        const weatherDetails = value.current_weather;
        return new Weather(weatherDetails.temperature, weatherDetails.weathercode, weatherDetails.time)
      }));
  }
  
}
