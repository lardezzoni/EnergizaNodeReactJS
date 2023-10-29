
import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/" >
                        About
                    </NavLink>
                    
                    <NavLink to="/events" activeStyle>
                        Demo
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Teams
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavLink to="/login" >
                        Login
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};
 
export default Navbar;