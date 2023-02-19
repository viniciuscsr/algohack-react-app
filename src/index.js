import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './custom.scss';
import App from './App';
import Results from './screens/Results/Results';
import Blog from './screens/Blog/Blog';
import BlogPost from './screens/BlogPost/BlogPost';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';
import Author from './screens/Author/Author';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<App />} exact></Route>
        <Route path='/results' element={<Results />} />
        <Route path='/blog/:slug' element={<BlogPost />} />
        <Route path='/blog' element={<Blog />} exact />
        <Route path='/blog/author/:name' element={<Author />} />
      </Routes>
    </main>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
