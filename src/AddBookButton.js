import React, { Component } from 'react';

class AddBookButton extends Component {
    state = {
        showSearchPage: false
    }
    render() {
        return (
            <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        )
    }

}

export default AddBookButton;