import { connect } from 'react-redux';
import { getFavorites } from '../../actions/fav_actions';
import Fav from './fav';

const msp = (state, ownProps) => {
    return {
        favorites: state.entities.favorites,
        ...ownProps,
    }
}

const mdp = dispatch => ({
    getFavorites: () => dispatch(getFavorites()),
})


export default connect(msp, mdp)(Fav);