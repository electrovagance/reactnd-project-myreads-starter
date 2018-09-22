import React from 'react';
import './App.css';
import SearchBooksBar from './SearchBooksBar';
import MyReadsHeader from './MyReadsHeader';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';
import AddBookButton from './AddBookButton';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (newShelf, selectedBook) => {
    this.setState((state) => ({
      // map over current state of books to find the changed one
      // if the changed one has been found, replace the shelf property with the new one
      books: state.books.map(b => {
        if (b === selectedBook) {
          b.shelf = newShelf
        } 
        return b;
      })
    }))
  }

  deleteBook = (bookToDelete) => {
    this.setState((state) => {
      books: state.books.filter((b) => b !== bookToDelete)
    })
  }

  addNewBook = (bookToAdd) => {
    this.setState((state) => {
      books: state.books.push(bookToAdd)
    })
  }

  getNewBooks(query) {
    BooksAPI.search(query).then((queryBooks) => {
      this.setState({ queryBooks })
    })
  }

  render() {
    return (
        <div className="app">

          <Route exact path="/" render={() => (
            <div>
              <MyReadsHeader />
              <CurrentlyReading updateShelf={this.updateShelf} deleteBook={this.deleteBook} books={this.state.books} />
              <WantToRead updateShelf={this.updateShelf} deleteBook={this.deleteBook} books={this.state.books} />
              <Read updateShelf={this.updateShelf} deleteBook={this.deleteBook} books={this.state.books} />
            </div>
            )
          }/>
          <AddBookButton/>

          <Route path="/search" render={() => (
            <SearchBooksBar addNewBook={this.addNewBook}/>
          )}/>

        </div>
    )
  }
}

export default BooksApp
