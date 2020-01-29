import { RECEIVE_BOOK, DELETED_BOOK, } from '../actions/book_actions';

function bookReducer(state = null, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOOK:
            return action.book;
        case DELETED_BOOK:
            return null;
        default:
            return state;
    }
}

export default bookReducer;