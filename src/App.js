import React from 'react';
import './App.css';
import SearchBooksBar from './components/SearchBooksBar';
import MyReadsHeader from './components/MyReadsHeader';
import CurrentlyReading from './components/CurrentlyReading';
import WantToRead from './components/WantToRead';
import Read from './components/Read';
import AddBookButton from './components/AddBookButton';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
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
      books: state.books.map(book => {
        if (book === selectedBook) {
          book.shelf = newShelf
        } 
        return book;
      })
    }))
  }
  addNewBook = (bookToAdd, shelfName) => {
    bookToAdd.shelf = shelfName;
    this.setState((state) => this.state.books.push(bookToAdd))
    }
  
  getNewBooks(query) {
    BooksAPI.search(query).then((queryBooks) => {
      this.setState({ queryBooks })
    })
  }

  deleteBook = (bookToDelete) => {
    this.setState((state) => {
      books: state.books.filter((b) => b !== bookToDelete)
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
              <AddBookButton />
            </div>
            )
          }/>

          <Route path="/search" render={() => (
            <SearchBooksBar addNewBook={this.addNewBook}/>
          )}/>

        </div>
    )
  }
}

export default BooksApp
