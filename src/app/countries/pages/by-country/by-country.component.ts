import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class ByCountryComponent implements OnInit {
  isError: boolean = false;
  searchTerm: string = '';
  countries: Country[] = [];
  suggestedCountries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {}

  searchByName = (term: string) => {
    this.searchTerm = term;
    this.isError = false;

    this.countriesService.searchByName(this.searchTerm).subscribe({
      next: (value) => {
        if ('status' in value) {
          this.isError = true;
        }
        this.countries = value;
      },
      error: () => {
        this.isError = true;
        this.countries = [];
      },
    });

    this.suggestedCountries = [];
    this.searchTerm = '';
  };

  suggestions = (term: string) => {
    this.searchTerm = term;
    this.isError = false;
    this.countriesService.searchByName(term).subscribe({
      next: (value) => {
        if ('status' in value) {
          this.suggestedCountries = [];
          this.isError = true;
        } else {
          this.suggestedCountries = value.splice(0, 5);
        }
      },
    });
  };
}
