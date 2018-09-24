import React, { Component } from 'react'
import '../App.css';
import AddBookButton from './components/AddBookButton';
import MyReadsHeader from './components/MyReadsHeader';
import Shelf from './components/Shelf';
import Book from './components/Book';
import * as BooksAPI from '../BooksAPI';

class Main extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    updateShelf = (shelf, book) => {
        BooksAPI.update(book, shelf).then(book => {
            book.shelf = shelf;
            this.setState(state => { state.books.filter(b => b.id !== book.id).concat([book])})
        })
    }

    getNewBooks(query) {
        BooksAPI.search(query).then((books) => {
            this.setState({ books })
        })
    }

    render() {
        return (
            <div>
                <MyReadsHeader />
                <Shelf books={this.state.books.filter((b) => b.shelf === 'currentlyReading')} shelfType={'currentlyReading'} shelfName={'Currently Reading'} updateShelf={this.updateShelf} > 
                    <Book books={this.state.books} updateShelf={this.updateShelf} />
                </Shelf>
                <Shelf books={this.state.books.filter((b) => b.shelf === 'wantToRead')} shelfType={'wantToRead'} shelfName={'Want To Read'} updateShelf={this.updateShelf} >
                    <Book books={this.state.books} updateShelf={this.updateShelf} />
                </Shelf>
                {/* <Shelf books={this.state.books.filter((b) => b.shelf === 'read')} shelfType={'read'} shelfName={'Read'} updateShelf={this.updateShelf} /> */}
                <AddBookButton />
            </div>
        )
    }
}

export default Main;
