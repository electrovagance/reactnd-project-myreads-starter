import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './../BooksAPI';

class SearchBooksBar extends Component {
    state = {
        query: '',
        queryBooks: {},
        matchedBooks: []
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.getQueryBooks(query);
    }

    getQueryBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((queryBooks) => {
                this.setState({ queryBooks })
            })
        }
        // what to do if no book matches?
        if (this.state.queryBooks.hasOwnProperty('error')) {
            console.log('ERROR!');
            this.setState({ matchedBooks: []});
        }
        else this.filterResults();
    }

    filterResults() {
        if (this.state.query) {
            // checking if queryBooks array is empty
            if (this.state.queryBooks.hasOwnProperty('id') !== false) console.log(this.state.queryBooks.hasOwnProperty('id')); 
            else {
                const match = new RegExp(escapeRegExp(this.state.query), 'i');
                // match query with book title or book author
                this.setState({
                    matchedBooks: this.state.queryBooks.filter((book) =>
                        match.test(book.title) || match.test(book.author)
                    )
                })
            }
        }
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
                        {(this.state.matchedBooks.length === 0) ? (
                            <p>No books found</p>
                        ) : (
                            this.state.matchedBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, 
                                                    backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
                                        <div className="book-shelf-changer">
                                                <select onChange={event => this.addNewBook(book, event.target.value)} value={book.shelf}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.author}</div>
                                </div>
                            </li>
                        )))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default SearchBooksBar;