import React from 'react';
import "../views/siderbar.scss";
import { NavLink } from "react-router-dom";

const SiderBar = () => {
    return (
        <div className="sidenav">
            <NavLink to="/all-task" activeClassName="selected" exact>
                All Tasks
            </NavLink>
            <NavLink to="/new-task" activeClassName="selected">
                New Task
            </NavLink>
            <NavLink to="/doing-task" activeClassName="selected">
                Doing Task
            </NavLink>
            <NavLink to="/done-task" activeClassName="selected">
                Done Task
            </NavLink>

        </div>
    );
};

export default SiderBar;