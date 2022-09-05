interface ICountry {
  name: sring;
  cioc: string;
  flag: string;
}

interface ICountriesAPI {
  searchByName(search: string): Promise<ICountry[]>;
}
