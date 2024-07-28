import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Navbar, Nav, Stack, Row } from "react-bootstrap";
import LogoutButton from "../auth/components/LogoutButton";
import NavLinkComponent from "./NavLinkComponent";
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
const Footer = () => {

    const { isAuthenticated } = useContext(AuthContext);


    return (
        <Navbar id="footer_navbar" expand="lg" className="mt-auto">
            <Stack className="mt-5 text-center">
                <Container id="footer_bg_holder">
                    <img src={process.env.PUBLIC_URL + "/assets/images/FootprintPathBig.png"} alt="background" />
                </Container>
                {/**  Nav Links **/}
                <Nav className="m-auto">
                    <Row className="ms-lg-5">
                        <Link id="footer_about_link" to="/about" className="nav-link">About Us</Link>
                        <Link id="footer_contact_link" to="/contact" className="nav-link">Contact</Link>
                    </Row>
                    <Row className="ms-lg-5">
                        <Link id="footer_services_link" to="/services" className="nav-link">Services</Link>
                        <Link id="footer_payment_policy_link" to="/payment_policy" className="nav-link">Payment Policy</Link>
                        {
                            !isAuthenticated ? (
                                <Link id="footer_signin_link" to="/login" className="nav-link">SignIn</Link>
                            ) : (
                                <Link id="footer_logout_link" to="/logout" className="nav-link">Logout</Link>
                            )
                        }
                    </Row>
                    <Row className="ms-lg-5">
                        <Link id="footer_privacy_link" to="/privacy_policy" className="nav-link">Privacy Policy</Link>
                        <Link id="footer_data_deletion_link" to="/data_deletion" className="nav-link">Data Deletion</Link>
                    </Row>
                </Nav>
                <Navbar.Brand id="logo_footer" href="/home"></Navbar.Brand>
                <Navbar.Text className="" id="copyright">
                    {new Date().getFullYear()} BbPets Adoption. All Rights Reserved.
                </Navbar.Text>
            </Stack>
        </Navbar>
    )
};


export default Footer;