import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { debounceTime, finalize, switchMap, tap, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { LocationService } from 'src/app/core/services/location/location.service';
import { City } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent {
  @Output() submitted = new EventEmitter<any>();

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });
  cities!: City[];
  isLoading!: boolean;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      tap(() => {
        this.isLoading = true;
      }),
			distinctUntilChanged(),
      switchMap((value: any) => this.locationService.getLocationsByCity(value)
        .pipe(
          finalize( () => {this.isLoading = false})
        ))
    )
  formatter = (x: {name: string}) => x.name;
  
  constructor(
    private locationService: LocationService,
  ) {}

  ngOnInit() {
    this.searchForm.controls.search.valueChanges
      .subscribe( () => {this.onSubmit(null)})
    console.log('searchForm', this.searchForm);
  }

  onSubmit(event: any) {
    if(event) event.preventDefault();
    this.submitted.emit(this.searchForm.controls.search.value)
  }

}
