import { connect } from 'react-redux';
import { getBook, updateBook, deleteBook } from '../../actions/book_actions';

import Book from './book';

const msp = (state, ownProps) => {
    return {
        book: state.book,
        loggedInUser: state.auth.user,
        ...ownProps,
    }
}

const mdp = dispatch => ({
    getBook: (id) => dispatch(getBook(id)),
    updateBook: (data) => dispatch(updateBook(data)),
    deleteBook: (data) => dispatch(deleteBook(data)),
})


export default connect(msp, mdp)(Book);