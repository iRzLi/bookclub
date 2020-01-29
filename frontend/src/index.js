import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import ReduxStore from './store/store';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from './utils/auth_util';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    // onload check if there's the current user is logged in
    let store = ReduxStore();
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        const currentTime = Date.now() / 1000;
        const decoded = jwtDecode(jwt);
        if (decoded.exp > currentTime) {
            const preloadedState = {
                auth: {
                    isAuthenticated: true,
                    user: { 
                        id: decoded.id,
                        email: decoded.email,
                        displayName: decoded.displayName
                    }
                }
            }
            setAuthToken(jwt);
            store = ReduxStore(preloadedState);
        } else {
            setAuthToken(null);
            localStorage.removeItem('jwt');
        }
    }


    ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});