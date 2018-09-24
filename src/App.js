import React from 'react';
import './App.css';
import Main from './pages/Main';
import SearchBooks from './pages/SearchBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  render() {
    return (
        <div className="app">
          <Route exact path="/" component={ Main }/>
          <Route exact path="/search" component={ SearchBooks }/>
        </div>
    )
  }
}

export default BooksApp
