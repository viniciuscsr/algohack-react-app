import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [url, setUrl] = useState('');

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const showSearchBar = pathname !== '/';

  const submitUrl = (e) => {
    const urlToString = {
      url: url,
    };

    const result = '?' + new URLSearchParams(urlToString).toString();

    e.preventDefault();
    if (url.trim()) {
      navigate(`/results${result}`, { state: { url: url } });
    }
  };

  const submitOnEnter = (e) => {
    if (e.keyCode === 13) {
      submitUrl(e);
    }
  };

  return (
    <header className='header'>
      {/* desktop */}
      <div className='header__container'>
        <div style={{ display: 'inline' }}>
          <span className='d-none'>AlgoHack</span>
          <Link to='/'>
            <img
              className='header__logo'
              src='/images/colorfull_algohack_logo_clear.png'
              alt='nav logo'
            />
          </Link>
        </div>
        {showSearchBar && (
          <span className='header__search-form d-none d-sm-block'>
            <input
              type='text'
              className='header__input'
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              onKeyDown={(e) => submitOnEnter(e)}
              placeholder='Paste your AirBnb listing URL here'
            />
            <button
              className='btn btn-primary btn-sm header__button'
              type='submit'
              onClick={(e) => {
                submitUrl(e);
              }}>
              Submit
            </button>
          </span>
        )}
        <Link to='/blog'>
          <a className='header__link' style={{ textDecoration: 'none' }}>
            Blog
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
