import React from 'react';
import './App.css';
import SearchBooksBar from './components/SearchBooksBar';
import MyReadsHeader from './components/MyReadsHeader';
import BookShelf from './components/BookShelf';
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

  getNewBooks(query) {
    BooksAPI.search(query).then((queryBooks) => {
      this.setState({ queryBooks })
    })
  }

  changeShelf(book, shelf) {
    // update selected book by calling the BooksAPI update function
    // and then call BooksAPI getAll method again
    BooksAPI.update(book, shelf).then(() => {
      this.componentDidMount()
      }
    )
  }
  
  // addNewBook = (bookToAdd, shelfName) => {
  //   // loop over books to find if the new book to be added is already on a shelf
  //   let duplicateBook = this.state.books.map(book => book.id === bookToAdd.id);
  //   // if matching book was found, save true in duplicate book
  //   duplicateBook = duplicateBook.filter(result => result === true);
    
  //   if (duplicateBook[0] === true) {
  //     alert("Duplicate book in list found! Return and change the book's shelf.")
  //   }
  //   else { 
  //     bookToAdd.shelf = shelfName;
  //     this.setState((state) => this.state.books.push(bookToAdd))
  //   }

  //   BooksAPI.update(bookToAdd, shelfName).then((queryBooks) => {
  //     this.setState({ queryBooks })
  //   })
    
  // }

  render() {

    let shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }

    return (
        <div className="app">

          <Route exact path="/" render={() => (
            <div>
              <MyReadsHeader />
              {/* loop over the tree shelves */}
              <div className="list-books-content">
                {Object.keys(shelves).map((shelf) =>
                  <BookShelf key={shelf}
                              shelf={shelves[shelf][1]}
                              title={shelves[shelf][0]}
                              books={this.state.books}
                              showShelf={true}
                              changeShelf={this.changeShelf.bind(this)}
                  />
                )}
              </div>
              <AddBookButton />
            </div>
            )
          }/>

          <Route path="/search" render={() => (
          <SearchBooksBar books={this.state.books} changeShelf={this.changeShelf.bind(this)}/>
          )}/>

        </div>
    )
  }
}

export default BooksApp
