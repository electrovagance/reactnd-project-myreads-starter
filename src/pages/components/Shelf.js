import React, { Component } from 'react'
import './../../App.css';
import Book from './Book'

class Shelf extends Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                <Book books={this.props.books} updateShelf={this.props.updateShelf}/>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shelf;