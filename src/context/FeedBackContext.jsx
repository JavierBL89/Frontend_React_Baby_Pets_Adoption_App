//
import React, { useState, useEffect, createContext } from 'react';


// create a context for authentication
const FeedbackContext = createContext();

/**
 *  AuthProvider component that will wrap the application and provide authentication state
 *  The Provider React component is a wrapper component that provides funtionalities 
 *  to all the components down the tree component from which is been wrapped
 *  
 *  This allows the user to navigate through the App as authenticated user without being logout all the time
 * 
 */
const FeedbackProvider = ({ children }) => {

    // message state
    const [postActionMessage, setPostActionMessage] = useState("");

    /***
     * Runs once when the component mounts. 
     * It reads the feedbackMessage from the localStorage 
     * and updates the state if a stored message exists
     * 
     * Dependency Array ([]): An empty array means 
     * this effect runs only once after the initial render
     */
    useEffect(() => {
        // get from localStore
        const message = localStorage.getItem('feedbackMessage');
        if (message) {
            setPostActionMessage(message);
            localStorage.removeItem('feedbackMessage');
        }
    }, []);


    /***
     * Clear message after 6 seconds
     */
    const clearMessage = () => {
        setTimeout(() => {
            setPostActionMessage("")
        }, 6000);

    }

    /***
     * Runs every time feedbackMessage changes
     * It stores the updated feedbackMessage in localStorage 
     * or removes it if the message is empty
     */
    useEffect(() => {
        if (postActionMessage) {
            clearMessage();
        }
    }, [postActionMessage]);


    // pass the authentication state and functions to the component tree
    return (
        <FeedbackContext.Provider value={{
            postActionMessage, setPostActionMessage
        }}>
            {children}
        </FeedbackContext.Provider>
    )
};


export { FeedbackProvider, FeedbackContext };
