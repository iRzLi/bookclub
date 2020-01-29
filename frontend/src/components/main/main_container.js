import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth_actions';
import { getBooks } from '../../actions/book_actions';
import MainPage from './main';

const msp = (state, ownProps) => {
    return {
        books: state.entities.books,
        loggedIn: state.auth.isAuthenticated,
        ...ownProps,
    }
}

const mdp = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    getBooks: () => dispatch(getBooks()),
})


export default connect(msp, mdp)(MainPage);