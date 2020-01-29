import { connect } from 'react-redux';
import { createBook } from '../../actions/book_actions';

import Create from './create';

const msp = (state, ownProps) => {
    return {
        ...ownProps,
    }
}

const mdp = dispatch => ({
    createBook: (data) => dispatch(createBook(data)),
})


export default connect(msp, mdp)(Create);