import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Navbar, Nav } from "react-bootstrap";
import NavLinkComponent from "./NavLinkComponent";
import NavbarDropDown from "./NavbarDropdown";
import LogInDropDown from "./LogInDropDown";
import ImageComponent from "./ImageComponent";
import { Link } from "react-router-dom";



/* 
* Header component holds the navigation top-bar of the application
*
* It uses React Boostrap components for grid an layout
* 
* Here's a breakdown of what the code is doing: 
* - It checks the application isAuthenticated state from the AuthContext
* - Conditional rendering is used to display different links based on whether the user is authencticated in the current session or not
*
* @returns the header navigation var
*/
const Header = () => {

    const { isAuthenticated } = useContext(AuthContext);
    const token = localStorage.getItem("token")


    return (
        <Navbar id="header_navbar" collapseOnSelect sticky="top" expand="lg" className="">
            <Container className="pe-3">
                <Navbar.Brand id="logo_nav" href="#">
                    <Link id="logo_nav" to="/" className="nav-link">
                        <Container id="logo_nav_holder" />
                    </Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {/**  Nav Links **/}
                        {token ?
                            <Link id="home_link_nav" to={`/${token}`} className="nav-link">
                                Main
                            </Link>
                            :
                            <Link id="home_link_nav" to={`/}`} className="nav-link">
                                Main
                            </Link>
                        }
                        { // condition to display different links
                            !isAuthenticated ? (
                                <>
                                    <LogInDropDown id="signIn_button" />
                                </>

                            ) : (
                                <NavbarDropDown id="account_dropdown" />

                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
};


export default Header;