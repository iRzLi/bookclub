import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth_actions';

import Register from './register';

const msp = (state, ownProps) => {
    return {
        loggedIn: state.auth.isAuthenticated,
        ...ownProps,
    }
}

const mdp = dispatch => ({
    registerUser: (data) => dispatch(registerUser(data)),
})


export default connect(msp, mdp)(Register);