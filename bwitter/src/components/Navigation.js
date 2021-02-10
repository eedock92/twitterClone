import React from "react";
import {Link} from "react-router-dom"

const Naviagation = ({userObj}) => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
        
            <li>
                <Link to="/profile">{userObj.displayName}의 My Profile</Link>
            </li>
        </ul>
    </nav>
);
<nav>


</nav>

export default Naviagation;