import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import IRegion from '../../interfaces/region.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [],
})
export class ByRegionComponent implements OnInit {
  regions: IRegion[] = [];
  activeRegion!: IRegion;
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.regions = [
      { name: 'European Union', code: 'EU' },
      { name: 'European Free Trade Association', code: 'EFTA' },
      { name: 'Caribbean Community', code: 'CARICOM' },
      { name: 'Pacific Alliance', code: 'PA' },
      { name: 'Union of South American Nations', code: 'USAN' },
      { name: 'Eurasian Economic Union', code: 'EEU' },
      { name: 'Arab League', code: 'AL' },
      { name: 'Association of Southeast Asian Nations', code: 'ASEAN' },
      { name: 'Central American Integration System', code: 'CAIS' },
      { name: 'Central European Free Trade Agreement', code: 'CEFTA' },
      { name: 'North American Free Trade Agreement', code: 'NAFTA' },
      {
        name: 'South Asian Association for Regional Cooperation',
        code: 'SAARC',
      },
    ];

    this.activeRegion = this.regions[0];

    this.loadActiveRegion(this.activeRegion);
  }

  loadActiveRegion = (activeRegion: IRegion) => {
    this.countries = [];

    this.activeRegion = activeRegion;

    this.countriesService.searchByRegion(this.activeRegion.code).subscribe({
      next: (v) => (this.countries = v),
    });
  };
}
