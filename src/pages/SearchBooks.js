import React, { Component } from 'react';
import Book from './components/Book';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './../BooksAPI';

class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.getQueryBooks(query);
    }

    getQueryBooks = (query) => {
        if (query) {
            let temp = '';
            BooksAPI.search(query).then((books) => {
                temp = books;
                if (temp.error === "empty query") this.setState({ books: []});
                else {
                    this.setState({ books: temp });
                    this.filterResults();
                }    
            })
        }
    }

    filterResults() {
        const match = new RegExp(escapeRegExp(this.state.query), 'i');
        // match query with book title or book author
        this.setState((state) => {
            this.state.books.filter((book) =>
                match.test(book.title) || match.test(book.authors)
            )
        })
    }

    addNewBook = (bookToAdd, shelfName) => {
        // loop over books to find if the new book to be added is already on a shelf
        let duplicateBook = this.state.books.map(book => book.id === bookToAdd.id);
        // if matching book was found, save true in duplicate book
        duplicateBook = duplicateBook.filter(result => result === true);

        if (duplicateBook[0] === true) {
            alert("Duplicate book in list found! Return and change the book's shelf.")
        }
        else {
            bookToAdd.shelf = shelfName;
            this.setState((state) => this.state.books.push(bookToAdd))
        }

        BooksAPI.update(bookToAdd, shelfName).then((response) => {
            this.setState({ currentBooks: this.state.queryBooks.push(bookToAdd)})
        })

    }

    updateShelf = (shelf, book) => {
        BooksAPI.update(book, shelf).then(book => {
            book.shelf = shelf;
            this.setState(state => { state.books.filter(b => b.id !== book.id).concat([book]) })
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className="close-search" 
                        to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => {this.updateQuery(event.target.value)}}
                            />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.length === 0 ? (
                            <p className="book-title">No books found</p>
                        ) : (
                            <Book updateShelf={this.updateShelf} books={this.state.books} /> 
                            ) 
                        }                     
                    </ol>
                </div>
            </div>
        )
    }

}

export default SearchBooks;