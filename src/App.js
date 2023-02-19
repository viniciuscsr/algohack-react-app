import { HOME_COMPONENTS } from './data/input';
import Search from './components/Search/Search';
import HomeCard from './components/HomeCard/HomeCard';
import Header from './components/Header/Header';
import './App.scss';

function App() {
  const renderCards = () => {
    return (
      <div className='container d-flex align-items-center'>
        <div className='row mt-5'>
          {HOME_COMPONENTS.map(({ heading, text, buttonCta }) => (
            <HomeCard heading={heading} text={text} buttonCta={buttonCta} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='App'>
      <Search />
      {renderCards()}
    </div>
  );
}

//---

export default App;
