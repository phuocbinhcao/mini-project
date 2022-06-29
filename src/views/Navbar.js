import React from 'react';
import "../views/navbar.scss"
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="topnav">
            <NavLink to="/create-task" activeClassName="selected">
                Create New Task
            </NavLink>


            <div className="search-container">
                <form action="/action_page.php">
                    <input type="text" placeholder="Search.." name="search" />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
};

export default Navbar;