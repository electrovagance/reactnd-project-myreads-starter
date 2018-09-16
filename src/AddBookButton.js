import React, { Component } from 'react';

class AddBookButton extends Component {
    state = {
        showSearchPage: ''
    }
    render() {

        const { showSearchPage } = this.props;
        return (
            <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        )
    }

}

export default AddBookButton;