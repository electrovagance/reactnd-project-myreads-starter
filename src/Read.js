import React, { Component } from 'react';

class Read extends Component {
    state = {
        books: ''
    }

    render() {
        let { books, updateShelf, deleteBook } = this.props;
        let showingBooks = '';
        showingBooks = books.filter((book) => book.shelf === 'read')
        books = showingBooks;

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: "url(" + book.imageLinks.thumbnail + ")"  }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={event => updateShelf(event.target.value, book)} value={book.shelf}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none" onClick={deleteBook(book)}>None</option>
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
                </div>
            </div>
        )
    }

}

export default Read;