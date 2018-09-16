import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooksBar from './SearchBooksBar'
import MyReadsHeader from './MyReadsHeader'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import * as BooksAPI from './BooksAPI'
// import AddBookButton from './AddBookButton'

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
      console.log({books});
    })
  }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooksBar/>
        ) : (
          <div className="list-books">
            <MyReadsHeader/>
            <div className="list-books-content">
              <CurrentlyReading books={this.state.books}/>
              <WantToRead books={this.state.books}/>
              <Read books={this.state.books}/>
            </div>
            {/* TODO: Add */}
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
