import React, { useState, useContext } from "react";
import { Container, Form, Row } from 'react-bootstrap';
import Heading from "../../../common/Heading";
import instance from "../../../../scripts/axiosConfig";
import TextComponent from "../../../common/TextComponent";
import { FeedbackContext } from "../../../../context/FeedBackContext";
import { useNavigate } from "react-router-dom";




/**
 * It is a form component that allows users
 * to update their email address
 * 
 * 
 * It also handles the form submission by making a PUT request,
 *  and handling returned http responses adn feedback
 * 
 * @returns  `EmailChangeComponent` component 
 */
const EmailChangeComponent = ({ onLoad }) => {

    const { setPostActionMessage } = useContext(FeedbackContext);

    const [message, setMessage] = useState(false);   // failedMessage state
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [confirmEmailMessage, setConfirmEmailMessage] = useState("");

    const navigate = useNavigate();

    var token = localStorage.getItem('token');  // grab current token from locat storage


    /***
     * Check emails entered match
     * Reset re-entered password state
     * @param {input}
     */
    const checkEmail = () => {

        if (email !== confirmEmail) {
            setConfirmEmailMessage("Email addresses do not match!");
            return false;
        } else {
            setConfirmEmailMessage("");
            return true;
        }
    }

    /***
    * clear input fields
    */
    const clearDataInput = () => {
        setEmail("");
        setConfirmEmail("");
    };

    /***
     * Method handles form submission.
     * 
     * Creates a Formdata object to then append form  key-value pairs
     * 
     * @param {*} e - the event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkEmail()) {
            return;
        }

        if (token) {

            onLoad(true);
            setConfirmEmailMessage("") // clear any data
            setMessage(false);  // reset to false
            try {
                // POST request with headers set to accept and handle multipart files on server side
                const response = await instance.put(`/account_management/update_email?token=${token}&email=${email}`);

                if (response.status === 200) {
                    onLoad(true);
                    clearDataInput();
                    window.scrollTo(0, 0);
                    setPostActionMessage("Your email address was successfylly updated!.");

                }
                else {
                    console.error("Form submission failed:", response.data);
                    setMessage("Form could not be submited. A server error occured. Please try again or contact admin to inform about the problem. ")
                }
            } catch (error) {
                console.error('Something went wrong! Error submitting form:', error.message);
            }
            onLoad(false);

        } else {
            setMessage("Authentication needed. Form could not be submited!")
        }

    };

    return (
        <Container id="email_update_wrapper">
            <Container className="email_update_container">
                <Heading
                    tagName="h6"
                    id="email_update_heading"
                    text="Email address update"
                />
                <Form onSubmit={handleSubmit} id="adoption_application_form">

                    <Row id="email_update_holder">
                        {/***************** {  email } ********/}
                        <Form.Label>Email address</Form.Label>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="lovepets@gmail.com"
                                required
                            />
                        </Form.Group>
                        {emailMessage && <p>{emailMessage}</p>}
                    </Row>

                    <Row id="confirm_email_update_holder">
                        {/***************** { confirm email } ********/}
                        <Form.Label>Confirm email address</Form.Label>
                        <Form.Group controlId="formConfirmEmail">
                            <Form.Control
                                type="text"
                                name="confirmEmail"
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {confirmEmailMessage && <p>{confirmEmailMessage}</p>}
                    </Row>

                    {/******** Feedback Message ********/}
                    <Row >
                        {message &&
                            <>
                                {message && <TextComponent id="email_update_form_failed_text" text={message} />}
                            </>
                        }
                    </Row>

                    {/******** Submit Button ********/}
                    <Row>
                        <button id="update_email_submit_button" className="btn btn-primary" type="submit">Submit</button>
                    </Row>
                </Form>
            </Container >

        </Container >
    )

};

export default EmailChangeComponent;