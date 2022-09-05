import debounce from 'utils/debounce';
import React, { ChangeEvent, MouseEvent, useState } from 'react';
import useConst from 'hooks/useConst';

import 'components/Autocomplete.scss';

interface IAutocompleteProps<T> {
  onSearch: (...args: any[]) => Promise<T[]>;
  onSelectItem: (item: T) => void;
  ItemComponent: React.FC<{
    item: T;
  }>;
  delay?: number;
}

export default function Autocomplete<T>({
  onSearch,
  onSelectItem,
  ItemComponent,
  delay = 1000,
}: IAutocompleteProps<T>): JSX.Element {
  const [isLoading, setLoading] = useState<boolean | undefined>(false);
  const [isVisible, setVisible] = useState<boolean | undefined>(false);
  const [results, setResults] = useState<T[]>([]);
  const [searchTxt, setSearchTxt] = useState<string>('');

  function clearSearch() {
    setSearchTxt('');
    setVisible(false);
    setLoading(false);
  }

  function handleSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTxt(event?.target?.value || '');
    debouncedSearch(event?.target?.value || '');
  }

  const handleSelectItem = (item: T) => (event: MouseEvent<HTMLLIElement>) => {
    onSelectItem(item);
    setSearchTxt('');
    setVisible(false);
    setLoading(false);
  };

  const debouncedSearch = useConst(
    debounce((search: string) => {
      if (search) {
        setVisible(true);
        setLoading(true);
        onSearch(search)
          .then(setResults)
          .finally(() => setLoading(false));
      } else {
        setVisible(false);
        setLoading(false);
        setResults([]);
      }
    }, delay)
  );

  return (
    <div className="autocomplete">
      <div className="autocomplete__search">
        <input type="text" value={searchTxt} onChange={handleSearchInputChange} placeholder="Search" />
        <button className="autocomplete__clear" type="button" onClick={clearSearch}>
          Clear
        </button>
      </div>
      <ul className="autocomplete__results" style={{ display: !isVisible ? 'none' : undefined }}>
        {isLoading ? (
          <li className="autocomplete__fallback-item">
            <span>Loading...</span>
          </li>
        ) : (
          <>
            {results.length > 0 ? (
              results.map((item: T, index: number) => (
                <li className="autocomplete__item" key={index} onClick={handleSelectItem(item)}>
                  <ItemComponent item={item} />
                </li>
              ))
            ) : (
              <li className="autocomplete__fallback-item">
                <span>No results found.</span>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
