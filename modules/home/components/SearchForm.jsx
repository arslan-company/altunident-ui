import GeneralSearch from '@/components/templates/inputs/GeneralSearch';

function SearchForm() {
  return (
    <div className="general-search-area pt-5 position-relative" style={{ backgroundColor: '#eefbfc', zIndex: 2 }}>
      <div className="container">
        <GeneralSearch />
      </div>
    </div>
  );
}

export default SearchForm;
