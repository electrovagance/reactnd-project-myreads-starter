import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import * as BooksAPI from './BooksAPI';

class SearchBooksBar extends Component {
    state = {
        query: 'Android',
        queryBooks: [],
        books: []
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
        else this.queryBooks = this.books;
    }

    render() {
        let { addNewBook, books } = this.props;
        // this.setState({ queryBooks: books });
        console.log("in SearchBooksBar displaying query books: " + this.state.queryBooks);

        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            this.queryBooks = this.props.books.filter((book) =>
                match.test(book.title) || match.test(book.author)
            )
        }

        // displayBooks.sort();

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a 
                        className="close-search" 
                        onClick={() => this.setState({ showSearchPage: false })}
                        href="/">
                        Close
                    </a>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                        {this.state.queryBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={event => addNewBook(event.target.value)}>
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
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default SearchBooksBar;