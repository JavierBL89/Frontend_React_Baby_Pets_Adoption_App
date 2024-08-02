//
import React, { useState, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// create a context for authentication
const NotificationsContext = createContext();

/**
 *  NotificationsContext component that will wrap the application and provide access user notifications state
 *  The NotificationsContext React component is a wrapper component that provides funtionalities 
 *  to all the components down the tree component from which is been wrapped
 *  
 *  This allows user to receive pending notifications, and real-time notifications
 * 
 */
const NotificationsProvider = ({ children }) => {

    // state to keep track of whether the user is authenticated or not
    const [errorMessage, setErrorMessage] = useState([]);
    const [unviewedListingsNotifications, setUnviewedListingsNotifications] = useState([]);
    const [unviewedAppStatusNotifications, setUnviewedAppStatusNotifications] = useState([]);
    const [listOfDroppAppsNotifications, setListOfDroppAppsNotifications] = useState([]);
    const [notificationsMessage, setNotificationsMessage] = useState();
    const [realTimeMessages, setRealTimeMessage] = useState([]);
    const [notificationsCounter, setNotificationsCounter] = useState(0);


    // pass the authentication state and functions to the component tree
    return (
        <NotificationsContext.Provider value={{
            errorMessage, setErrorMessage, notificationsCounter,
            notificationsMessage, setNotificationsMessage,
            unviewedListingsNotifications, setUnviewedListingsNotifications,
            unviewedAppStatusNotifications, setUnviewedAppStatusNotifications,
            listOfDroppAppsNotifications, setListOfDroppAppsNotifications,
            realTimeMessages, setRealTimeMessage
        }}>
            {children}
        </NotificationsContext.Provider>
    )
};


export { NotificationsProvider, NotificationsContext };
