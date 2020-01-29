import { RECEIVE_FAVORITES, } from '../actions/fav_actions';

function favsReducer(state = [], action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FAVORITES:
            return action.favorites;
        default:
            return state;
    }
}

export default favsReducer;