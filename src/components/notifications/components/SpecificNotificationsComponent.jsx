import React from "react";
import { Container } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Heading from "../../common/Heading";



/**
 * Component to display a information message when a new notification comes in.
 * It let's the user marking notifications as viewed through a PUT request
 * 
 * @param {String} text - a custom message to render whe needed
 * @param {String} token - the user autentication token
 * @param {String} notificationId - the id of the notification itself
 * @param {String} applicationId - the adoption application Id with notifcation is related to
 * @param {*} onViewed - a fucntion from parent component to pass up data when clicked 
 * @returns The `NotificationMessageComponent` functional component is being returned
 */
const SpecificNotificationsComponent = ({ text, notificationId, onViewed }) => {


    return (
        <>
            {/*********** diplays a message when 'text' data is passed ******** */}
            {text &&
                <Container>
                    <Container id="notification_message_container" className="d-flex justify-content-around">
                        <Heading tagName="h6" className="notification_message" text={text} />
                        <FaCheck onClick={() => onViewed(notificationId)} />
                    </Container>
                </Container >

            }

        </>
    )
};

export default SpecificNotificationsComponent;
