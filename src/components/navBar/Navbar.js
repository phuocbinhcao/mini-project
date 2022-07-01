import React from 'react';
import "./navbar.scss"
import { NavLink } from "react-router-dom";

const Navbar = ({ handleChangeSearch, dataFilter }) => {
    return (
        <div className="topnav">
            <NavLink to="/create-task" activeClassName="selected">
                Create New Task
            </NavLink>
            <div className="search-container">
                <input
                    value={dataFilter}
                    onChange={handleChangeSearch}
                    placeholder="Search.."
                />
            </div>
        </div>
    );
};

export default Navbar;