import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [],
})
export class ByCapitalComponent implements OnInit {
  isError: boolean = false;
  searchTerm: string = '';
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {}

  searchByName = (term: string) => {
    this.searchTerm = term;
    this.isError = false;

    this.countriesService.searchByCapitalName(this.searchTerm).subscribe({
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
  };

  suggestions = (value: string) => {
    this.isError = false;
    //TODO: Crear sugerencias.
  };
}
