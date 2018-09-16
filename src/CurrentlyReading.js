import React, { Component } from 'react';

class CurrentlyReading extends Component {
    state = {
        books: ''
    }


    render() {
        let { books, updateShelf } = this.props;
        let showingBooks = '';
        showingBooks = books.filter((book) => book.shelf === 'currentlyReading');
        books = showingBooks;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={((event) => updateShelf(event.target.value, book))} value={book.shelf} >
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
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default CurrentlyReading;