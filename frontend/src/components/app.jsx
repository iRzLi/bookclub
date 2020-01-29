import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './util/routes';
// import { Route } from 'react-router-dom';
import MainPage from './main/main_container';
import Register from './register/register_container';
import Login from './login/login_container';
import Create from './create/create_container';
import Book from './book/book_container';
import Favorites from './favorites/fav_container';

import './app.css';

function App() {
    return (
        <>
            <Switch>
                <AuthRoute path='/login' exact component={Login} />
                <AuthRoute path='/register' exact component={Register} />
                <ProtectedRoute path='/book/:bookId' exact component={Book} />
                <ProtectedRoute path='/create' exact component={Create} />
                <ProtectedRoute path='/favorites' exact component={Favorites} />
                <ProtectedRoute path='/' component={MainPage} />
            </Switch>
        </>
    )
}


export default App;
