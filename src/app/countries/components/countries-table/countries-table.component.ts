import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss'],
})
export class CountriesTableComponent implements OnInit {
  @Input('countriesData') countries: Country[] = [];

  constructor() {}

  ngOnInit(): void {}
}
