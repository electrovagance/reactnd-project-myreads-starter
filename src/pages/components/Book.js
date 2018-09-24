import React, { Component } from 'react';
import './../../App.css';

class Book extends Component {
    
    render() {
        return (
            (this.props.books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
                                `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                                <select onChange={event => {
                                    event.preventDefault();
                                    this.props.updateShelf(event.target.value, book)}} 
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
            )))
        )
    }
}

export default Book;




