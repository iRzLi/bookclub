import React from 'react';
import Navbar from '../navbar/navbar_container';

class Fav extends React.Component {
    constructor(props) {
        super(props);
        this.goToBook = this.goToBook.bind(this);
    }

    goToBook(bookId) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/book/${bookId}`);
        }
    }

    componentDidMount() {
        this.props.getFavorites();
    }

    render() {
        const bookElements = this.props.favorites.map((book) => {
            return <div className="flexRow flexCenter" key={"favs"+book.id}>
                <div className="bookListingContainer shadow flexRow pointer" onClick={this.goToBook(book.id)}>
                    <ul className="bookListing">
                        <li>Title: {book.title}</li>
                        <li>Author: {book.author}</li>
                        <li>Genre: {book.genre}</li>
                    </ul>
                </div>
            </div>
        })
        return (
            <React.Fragment>
                <Navbar />
                {bookElements}
            </React.Fragment>
        )
    }
}

export default Fav;