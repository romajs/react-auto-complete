/**
 * Using REST COUNTRIES implementation - version: 2
 * @see {@link https://restcountries.com/#api-endpoints-v2-name}
 */
const DEFAULT_API_URL = 'https://restcountries.com/v2';

export class CountriesAPI implements ICountriesAPI {
  private url: string;

  constructor(url: string = DEFAULT_API_URL) {
    this.url = url;
  }

  searchByName(search: string): Promise<ICountry[]> {
    return fetch(`${this.url}/name/${search}`).then((response) => response.json());
  }
}
