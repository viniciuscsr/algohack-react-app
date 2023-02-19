import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SearchIcon from '../../icons/SearchIcon';
import './Search.scss';

export default function Search() {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (url.includes('airbnb.com/')) {
      setIsValid(true);
      setShowErrorMessage(false);
    }
  }, [url]);

  const submitOnEnter = (e) => {
    if (e.keyCode === 13) {
      submitUrl(e);
    }
  };

  const submitUrl = async (e) => {
    e.preventDefault();

    const urlToString = {
      url: url,
    };

    const result = '?' + new URLSearchParams(urlToString).toString();

    if (isValid && url.trim()) {
      navigate(`/results${result}`, { state: { url: url } });
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <>
      <div className='search__container text-center'>
        <div className='search__content-container'>
          <h1>Rank higher on Airbnb with AlgoHack</h1>
          <p>
            AlgoHack is the ultimate tool for Airbnb hosts. Our algorithm helps
            you optimize your listing and get the best out of your Airbnb
            business.
          </p>
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
          {showErrorMessage && (
            <div className='search__invalid-input'>Invalid URL</div>
          )}
        </div>
      </div>
    </>
  );
}
