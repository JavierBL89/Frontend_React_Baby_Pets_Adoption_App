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
                <Link id="profile_link_nav" to={`/profile/${token}`} >Profile</Link>
            </NavDropdown.Item>

            {/***************** My Listings (Notifications badge must be always there) **********/}
            <NavDropdown.Item as="span">
                <Link id="myListings_link_nav" to={`/my_listings/${token}`} className="me-0">My Listings</Link>
                {unviewedListingsNotifications.length > 0 ?
                    <NotificationBadge className="show" text={unviewedListingsNotifications.length} />
                    :
                    <NotificationBadge className="hidden" text={unviewedListingsNotifications.length} />
                }
            </NavDropdown.Item>

            {/***************** My Applications **********/}
            <NavDropdown.Item as="span">
                <Link id="profile_link_nav" to={`/my_applications/${token}`} className="me-0">My Applications</Link>
                {unviewedAppStatusNotifications.length > 0 ?
                    <NotificationBadge className="show" text={unviewedAppStatusNotifications.length} />
                    :
                    <NotificationBadge className="hidden" text={unviewedAppStatusNotifications.length} />
                }
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