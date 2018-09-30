import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class AddBookButton extends PureComponent {
    render() {
        return (
            <div className="open-search">
                <Link 
                    to="/search"
                    >Add a book
                </Link>
            </div>
        )
    }
}

export default AddBookButton;