import React from 'react';
import './App.css';
import SearchBooksBar from './SearchBooksBar';
import MyReadsHeader from './MyReadsHeader';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';
import * as BooksAPI from './BooksAPI';
// import AddBookButton from './AddBookButton';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
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

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooksBar addNewBook={this.addNewBook} books={this.state.books} showSearchPage={this.state.showSearchPage}/>
        ) : (
          <div className="list-books">
            <MyReadsHeader/>
            <div className="list-books-content">
              <CurrentlyReading updateShelf={this.updateShelf} deleteBook={this.deleteBook} books={this.state.books}/>
              <WantToRead updateShelf={this.updateShelf} deleteBook={this.deleteBook} books={this.state.books}/>
              <Read updateShelf={this.updateShelf} deleteBook={this.deleteBook} books={this.state.books}/>
            </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            {/* <AddBookButton showSearchPage={this.state.showSearchPage}/> */}
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
