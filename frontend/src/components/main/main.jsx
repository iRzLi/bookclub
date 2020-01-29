import React from 'react';
import Navbar from '../navbar/navbar_container';

class Main extends React.Component {
    constructor(props){
        super(props);
        this.goToBook = this.goToBook.bind(this);
    }

    goToBook(bookId) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/book/${bookId}`);
        }
    }

    componentDidMount(){
        this.props.getBooks();
    }

    render() {
        const bookElements = this.props.books.map((book) => {
            return <div className="flexRow flexCenter" key={"book"+book.id}>
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

export default Main;