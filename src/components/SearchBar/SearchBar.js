import './SearchBar.scss';

const SearchBar = () => {
  return (
    <div className='search__bar'>
      <input
        className={`search__input ${
          showErrorMessage ? 'search__input__invalid' : ''
        }`}
        type='text'
        value={url}
        placeholder='Your Airbnb URL goes here'
        onChange={(e) => {
          setUrl(e.target.value);
          setShowErrorMessage(false);
        }}
        onKeyDown={(e) => submitOnEnter(e)}
      />
      <Button
        variant='outline-light'
        onClick={(e) => {
          submitUrl(e);
        }}
        className='search__icon'>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBar;
