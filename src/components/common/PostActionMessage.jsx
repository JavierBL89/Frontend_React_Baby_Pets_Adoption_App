import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Heading from "./Heading";
import { FeedbackContext } from "../../context/FeedBackContext";



/***
 * Component to represent a feeedback message post-action
 * 
 */
const PostActionMessage = ({ text }) => {

    const { postActionMessage } = useContext(FeedbackContext);


    return (
        <Container id="post_action_message_wrapper">
            <Container id="post_action_message_container">
                <Heading tagName="h6" id="post_action_message" text={postActionMessage} />
            </Container>
        </Container>
    )
};


export default PostActionMessage;