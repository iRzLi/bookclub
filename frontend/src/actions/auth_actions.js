import * as AuthUtil from '../utils/auth_util'
import jwtDecode from 'jwt-decode';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});


const removeUser = () => ({
  type: REMOVE_USER
})

// used to pull user data from token
const authenticateUser = token => {
  const decoded = jwtDecode(token);
  localStorage.setItem('jwt', token);
  AuthUtil.setAuthToken(token);

  return { id: decoded.id, email: decoded.email, displayName: decoded.displayName};
}


export const registerUser = data => dispatch => (
  AuthUtil.registerUser(data)
    .then( res => {
      const user = authenticateUser(res.data.token);
      dispatch(receiveUser(user));
    })
)


export const loginUser = data => dispatch => (
  AuthUtil.loginUser(data)
    .then( res => {
      const user = authenticateUser(res.data.token);
      dispatch(receiveUser(user));
    })
)


export const logoutUser = () => dispatch => {
  AuthUtil.setAuthToken(null);
  localStorage.removeItem('jwt');
  dispatch(removeUser()); 
}



