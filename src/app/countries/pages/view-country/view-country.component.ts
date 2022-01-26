import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/countries.interface';
@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.scss'],
})
export class ViewCountryComponent implements OnInit {
  country!: Country;
  countryTranslations: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.countriesService.searchCountryByCode(id).subscribe({
    //     next: (value) => console.log(value),
    //   });
    // });
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByCode(id)),
        tap(console.log)
      )
      .subscribe((response: Country) => {
        console.log(response.translations);
        this.country = response;
        this.loadCountryTranslations();
      });
  }

  private loadCountryTranslations = () => {
    for (let [_, V] of Object.entries(this.country.translations)) {
      this.countryTranslations = [...this.countryTranslations, V];
    }
  };
}
