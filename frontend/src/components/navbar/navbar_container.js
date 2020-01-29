import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth_actions';

import Navbar from './navbar';

const msp = (state, ownProps) => {
    return {
        loggedIn: state.auth.isAuthenticated,
        ...ownProps,
    }
}

const mdp = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
})


export default connect(msp, mdp)(Navbar);