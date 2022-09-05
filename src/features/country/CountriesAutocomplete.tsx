import { CountriesAPI } from 'api/CountriesAPI';
import { useState } from 'react';
import Autocomplete from 'components/Autocomplete';
import useConst from 'hooks/useConst';

import 'features/country/CountriesAutocomplete.scss';

function AutocompleteItem({ item }: { item: ICountry }): JSX.Element {
  return (
    <div className="country-item">
      <img className="country-item__flag" src={item.flag} />
      <span className="country-item__name">{item.name}</span>
    </div>
  );
}

export default function CountriesAutocomplete(): JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>();
  const countryAPI = useConst(new CountriesAPI());

  function searchCountriesByName(search: string) {
    return countryAPI.searchByName(search);
  }

  function selectCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  function removeSelectedCountry() {
    setSelectedCountry(undefined);
  }

  return (
    <div className="countries-autocomplete">
      <Autocomplete onSearch={searchCountriesByName} onSelectItem={selectCountry} ItemComponent={AutocompleteItem} />
      {selectedCountry && (
        <div className="country-selected">
          <label>Selected country:</label>
          <AutocompleteItem item={selectedCountry} />
          <button type="button" onClick={removeSelectedCountry}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
