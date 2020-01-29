import * as FavUtil from '../utils/fav_util';


export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';

const receiveFavorites = favorites => {
    return {
        type: RECEIVE_FAVORITES,
        favorites
    }
}

export const getFavorites = () => dispatch => (
    FavUtil.getFavorites()
        .then(res => {
            dispatch(receiveFavorites(res.data.books));
        })
)