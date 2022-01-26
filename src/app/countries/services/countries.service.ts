import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _serviceUrl = 'https://restcountries.com/v2';

  constructor(private httpClient: HttpClient) {}

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'flag,name,capital,population,alpha2Code'
    );
  }
  searchByName = (name: string): Observable<Country[]> => {
    const url = `${this._serviceUrl}/name/${name}`;
    return (
      this.httpClient.get<Country[]>(url, { params: this.httpParams }) || []
    );
  };

  searchByCapitalName = (name: string): Observable<Country[]> => {
    const url = `${this._serviceUrl}/capital/${name}`;
    return (
      this.httpClient.get<Country[]>(url, { params: this.httpParams }) || []
    );
  };

  searchByRegion = (name: string): Observable<Country[]> => {
    const url = `${this._serviceUrl}/regionalbloc/${name}`;
    return (
      this.httpClient.get<Country[]>(url, { params: this.httpParams }) || []
    );
  };

  searchCountryByCode = (code: string): Observable<Country> => {
    const url = `${this._serviceUrl}/alpha/${code}`;
    return this.httpClient.get<Country>(url) || [];
  };
}
