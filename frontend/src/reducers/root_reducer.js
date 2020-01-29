import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import bookReducer from './book_reducer';
import entitiesReducer from './entities_reducer';

export default combineReducers({
  auth: authReducer,
  book: bookReducer,
  entities: entitiesReducer
});


