import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavDropdown } from "react-bootstrap";
import NavLinkComponent from "./NavLinkComponent";
import NotificationBadge from "../notifications/components/NotificationBadge";
import { NotificationsContext } from "../../context/NotificationsContext";
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
const NavbarDropDown = ({ id }) => {

    const { isAuthenticated, logout, userName } = useContext(AuthContext);
    const { unviewedListingsNotifications, unviewedAppStatusNotifications } = useContext(NotificationsContext);

    const token = localStorage.getItem('token');

    return (
        <NavDropdown
            id={id}
            title={userName ? userName : "Account"}
            menuVariant="light"
            className="dropstart"
        >
            {/***************** Profile **********/}
            <NavDropdown.Item as="span">
                <Link id="profile_link_nav" href={`/profile/${token}`} >Profile</Link>
            </NavDropdown.Item>

            {/***************** My Listings **********/}
            <NavDropdown.Item as="span">
                <Link id="myListings_link_nav" to={`/my_listings/${token}`}>My Listings</Link>
                {unviewedListingsNotifications.length > 0 && <NotificationBadge text={unviewedListingsNotifications.length} />}
            </NavDropdown.Item>

            {/***************** My Applications **********/}
            <NavDropdown.Item as="span">
                <Link id="profile_link_nav" href={`/my_applications/${token}`}>My Applications</Link>
                {unviewedAppStatusNotifications.length > 0 && <NotificationBadge text={unviewedAppStatusNotifications.length} />}
            </NavDropdown.Item>

            {/***************** SignOut **********/}
            <NavDropdown.Divider />
            <NavDropdown.Item as="span">
                <NavLinkComponent id="signout_link_nav" onClick={() => logout()} href={""} text="SignOut" />
            </NavDropdown.Item>

        </NavDropdown>

    )
};


export default NavbarDropDown;