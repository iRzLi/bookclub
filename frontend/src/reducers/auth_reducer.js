import { RECEIVE_USER, REMOVE_USER} from '../actions/auth_actions';

const defaultState = {
  isAuthenticated: false, 
  user: {
    email: null,
    displayName: null
  }
}

function authReducer(state=defaultState, action) {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_USER:
      return { isAuthenticated: true, user: action.user };
    case REMOVE_USER:
      return defaultState;
    default: 
      return state;
  }
}

export default authReducer;