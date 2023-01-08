import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/app/shared/models/city/city.model';
import { distinct, tap, map, mergeAll, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiBaseURL = 'https://geocoding-api.open-meteo.com';

  constructor(
    private http: HttpClient
  ) { }

  getLocationsByCity(city: string | null) {
    const url = `${this.apiBaseURL}/v1/search?name=${city}&count=20`;
    console.log(`URL: ${url}`);
    return this.http.get(url)
      .pipe(
        map((value: any) => {
          console.log('getLocationsByCity()', value)
          const uniqueCities = value.results.filter((v:any, i:any, a: any) => a.findIndex((v2:any)=>(v2.name===v.name))===i)
          return uniqueCities.map( (city: any) => new City(city.id, city.name, city.latitude, city.longitude, city.country, city.country_code, city.timezone) );
        }),
        catchError(() => {
          return of([]);
        })
      );
  }

}
