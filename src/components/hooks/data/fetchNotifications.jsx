import React, { useContext, useEffect, useCallback } from "react";
import instance from "../../../scripts/axiosConfig";
import { useParams } from "react-router-dom";
import { NotificationsContext } from "../../../context/NotificationsContext";


/**
 * Custom Hook makes API GET request to retrieve notifications.
 *
 * This hook listens to changes on the authentication state to make a GET request for notifications
 *
 * @returns notifications and other useful states to be used across other modules
 */
const useFetchNotifications = () => {
    const { isAuthenticated } = useContext(NotificationsContext);

    const { setUnviewedListingsNotifications, setErrorMessage,
        setUnviewedAppStatusNotifications, setNotificationsMessage } = useContext(NotificationsContext);

    const token = localStorage.getItem('token');

    const fetchNotifications = useCallback(async () => {

        // early exit if   token is missing 
        if (!token) {
            return;
        }

        if (token) {
            try {
                const response = await instance.get(`/notifications/pending?token=${token}`);
                if (response.status === 200) {
                    const result = response.data;
                    if (result) {
                        // store the 2 diffrente lists of pending notifictions
                        const unviewedListingspNotifications = result.unviewedListingspNotifications || [];
                        const unviewedAppStatusNotifications = result.unviewedAppStatusNotifications || [];

                        // filter out notifications unviewed Application notifications where status is not pending
                        const filterUnviewedAppStatusNotifications = unviewedAppStatusNotifications.filter(notification => notification.status !== 'Pending');
                        // filter out notifications where applicantId does not match senderId
                        const filteredUnviewedListingspNotifications = unviewedListingspNotifications;

                        // set the filtered notifications to state
                        setUnviewedListingsNotifications(filteredUnviewedListingspNotifications);
                        setUnviewedAppStatusNotifications(filterUnviewedAppStatusNotifications);

                        // set amount of notifications message for user
                        setNotificationsMessage("You have " +
                            (filteredUnviewedListingspNotifications.length + filterUnviewedAppStatusNotifications.length)
                            + " new notifications")
                    }

                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        } else {
            setErrorMessage("Authentication needed. Notification could no be retrieved")
        }
    }, [token, setErrorMessage, setUnviewedListingsNotifications,
        setUnviewedAppStatusNotifications, setNotificationsMessage]);


    /***
    * useEfect listens to changes on token from Auth context 
    * to get triggered and perform a get request to API and handle response.
    * 
    * When the user first login, 'pending' notifications will be retreived from db
    * and set the 'notifications' state of NotificationsContext with them. 
    * */
    useEffect(() => {
        fetchNotifications();
    }, [token, fetchNotifications]);

    return { fetchNotifications };

};



export default useFetchNotifications;