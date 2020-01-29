import React from 'react';
import { withRouter } from "react-router";

function Navbar (props) {

    const historyPush = (route) => {
        return e => {
            props.history.push(route)
        }
    }
    return (<React.Fragment>
        <div className="navbarContainer">
            <div className="navbar">
                <div className="title">Book Club</div>
                <ul className="options">
                    <li onClick={historyPush("/")}>Books</li>
                    <li onClick={historyPush("/create")}>Create</li>
                    <li onClick={historyPush("/favorites")}>Favorites</li>
                    <li onClick={props.logoutUser}>Logout</li>
                </ul>
            </div>
        </div>
    </React.Fragment>);
}

export default withRouter(Navbar)