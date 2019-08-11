import React from "react";
import {NavLink} from "react-router-dom"; // An Anchor that React Router controls

const Header = () => {
    const activeStyle = { color: "#f15B2A"};
    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink> {/* So this link will only receive the active style when on homepage */}
            {" | "}
            <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>

        </nav>
    );
};

export default Header;
