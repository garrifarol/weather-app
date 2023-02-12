import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; 
import { debounceTime, finalize, switchMap, tap, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { LocationService } from 'src/app/core/services/location/location.service';
import { City } from 'src/app/shared/models/city/city.model';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css'],
  providers: [     
    {       
      provide: NG_VALUE_ACCESSOR, 
      useExisting: SearchLocationComponent,
      multi: true     
    }
  ] 
})
export class SearchLocationComponent implements ControlValueAccessor {
  onChange: any = () => {}
  onTouch: any = () => {}

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });
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

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;                                                                   
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit() {
    this.searchForm.controls.search.valueChanges
      .subscribe( () => {this.onSubmit(null)})
    console.log('searchForm', this.searchForm);
  }

  onSubmit(event: any) {
    if(event) return event.preventDefault();
    this.onChange(this.searchForm.controls.search.value);
    this.onTouch(this.searchForm.controls.search.value);
  }

}
