import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './../BooksAPI';

class SearchBooksBar extends Component {
    constructor(props) {
        super(props);
        this.state = ({
                    query: '',
                    books: [],
                    shelvedBooks: props.books
                })
    }

    componentWillMount() {
        this.setState({ shelvedBooks: this.props.books })
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
            }).then(() => {
                if (temp.error === "empty query") this.setState({ books: [] });
                else {
                    console.log(temp)
                    // comparing results with books on already on shelves
                    this.state.shelvedBooks.map(b1 => {
                        temp.map(b2 => {
                            if (b1.id === b2.id) b2.shelf = b1.shelf;
                        })
                    })

                    // this.setState((state) => {
                    //     return { books: state.books.filter(books => books.id !== temp.id) }
                    // })
                    this.setState({ books: temp})
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
                        {(this.state.books.length === 0) ? (
                            <p>No books found</p>
                        ) : (
                            this.state.books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, 
                                                    backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
                                        <div className="book-shelf-changer">
                                                <select onChange={event => {
                                                    this.props.changeShelf(book, event.target.value)}}
                                                    value={book.shelf || "none"}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
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