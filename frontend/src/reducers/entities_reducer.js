import { combineReducers } from 'redux';
import booksReducer from './books_reducer';
import favReducer from './fav_reducer';



export default combineReducers({
    books: booksReducer,
    favorites: favReducer,
});


