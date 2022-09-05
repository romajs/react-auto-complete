import LoremIpsum from 'components/LoremIpsum';
import Repeater from 'components/Repeater';
import CountriesAutocomplete from 'features/country/CountriesAutocomplete';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Repeater times={4}>
        <LoremIpsum />
      </Repeater>
      <CountriesAutocomplete />
      <Repeater times={10}>
        <LoremIpsum />
      </Repeater>
    </>
  );
}
