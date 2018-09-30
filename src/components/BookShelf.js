import React, { Component } from 'react';

class BookShelf extends Component {

    render() {

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {this.props.books.filter(b => b.shelf === this.props.shelf).map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128, height: 193, backgroundImage:
                                                `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`
                                        }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={event => {
                                                event.preventDefault();
                                                this.props.changeShelf(book, event.target.value)
                                            }}
                                                value={book.shelf || "none"}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title || 'No title found'}</div>
                                    <div className="book-authors">{book.authors || 'No author found'}</div>
                                </div>
                            </li>
                        ))}

                    </ol>
                </div>
            </div>
            </div>
        </div>
        )
    }

}

export default BookShelf;