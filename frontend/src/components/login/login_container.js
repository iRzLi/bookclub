import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth_actions';

import Login from './login';

const msp = (state, ownProps) => {
    return {
        loggedIn: state.auth.isAuthenticated,
        ...ownProps,
    }
}

const mdp = dispatch => ({
    loginUser: (data) => dispatch(loginUser(data)),
})


export default connect(msp, mdp)(Login);