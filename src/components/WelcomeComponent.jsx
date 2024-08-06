import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Heading from "./common/Heading";
import { NotificationsContext } from "../context/NotificationsContext";
import useFetchNotifications from "./hooks/data/fetchNotifications";
import NotificationMessageComponent from "./notifications/components/NotificationMessageComponent";
import { FeedbackContext } from "../context/FeedBackContext";
import PostActionMessage from "./common/PostActionMessage";


/***
 * Component for holding homepage welcome message.
 * 
 * Additionaly uses authentication app state to display or hide a sign in message 
 * 
 */
const WelcomeComponent = () => {

    const { isAuthenticated } = useContext(AuthContext);
    const { notificationsMessage } = useContext(NotificationsContext);

    const { welcomeMessage } = useContext(FeedbackContext);

    useFetchNotifications();

    return (
        <Container >
            <Container >
                <Row id="notifications_space">

                    {!isAuthenticated ?
                        (
                            <Container id="sign_in_holder">
                                <Heading tagName="h6" id="sign_in_messsage" text="Sign in to access adoption services !" />
                            </Container>
                        )
                        : welcomeMessage ? (
                            <PostActionMessage text={welcomeMessage} />
                        )
                            : notificationsMessage ?
                                (
                                    <NotificationMessageComponent className="show" />
                                )
                                :
                                null
                    }
                </Row>
            </Container>
        </Container>
    )

};


export default WelcomeComponent;