import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { NotificationsContext } from "../../../context/NotificationsContext";
import Heading from "../../common/Heading";
import instance from "../../../scripts/axiosConfig";


/**
* Component to display a information message for general usage
*/
const NotificationMessageComponent = () => {

    // listen to changes on 'notificationsMessage' from 'NotificationsContext'
    const { notificationsMessage } = useContext(NotificationsContext);
    const [message, setMessage] = useState("")


    /**
     * useEffect listens to when new message is set in 'notificationMessage'
     */
    useEffect(() => {
        setMessage([]);
        setMessage(notificationsMessage);
    }, [notificationsMessage]);


    return (
        <>
            {/*********** diplays a message if 'notificationsMessage' data is found ******** */}
            {notificationsMessage &&
                <Container>
                    <Container id="notification_message_container">
                        <Heading tagName="h6" className="notification_message" text={message} />
                    </Container>
                </Container >

            }
        </>
    )
};

export default NotificationMessageComponent;
