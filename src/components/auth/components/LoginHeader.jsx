import { useState, useContext } from "react";
import instance from '../../../scripts/axiosConfig';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

import { FeedbackContext } from "../../../context/FeedBackContext";

/**
 * Login component handles the login functionality
 * 
 * - Uses axios for making HTTP requests to the backend.
 * - Uses useNavigate for redirecting the user to login page after a successful reset.
 * - Uses useLocation for extracting the token from the URL.
 * - Receives request status and feedback from backend for each HTTP request,
 *  which is used to provide users with useful information
 * 
 * @returns the form for login 
 */
const Login = () => {

    // set user state after successfull login
    const { login } = useContext(AuthContext);
    const { setPostActionMessage } = useContext(FeedbackContext)

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    /**
     * Handles form input changes and updates the credentials state
     *
     * @param e The form input change event.
     */
    const handleCredentials = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }


    /**
     *  Handles the initial step for the password reset functionality
     *  Grabs the entered email and sends it to backend to verify that user is actually already registered.
     *  Uses axios for making the HTTP reuest
     * 
     * @param e the form submit event
     */
    const resetPassword = async () => {

        setMessage(""); // clear existing message
        setLoading(true);
        // ensure email field is filled
        if (!credentials.email) {
            setEmailMessage("Please enter your email and try again.")
        }

        if (credentials.email !== "") {
            try {
                // POST request to the /auth/forgot_password endpoint with the user's credentials
                const response = await instance.post('/auth/forgot_password', { email: credentials.email });

                // check if response exists
                if (response.status === 200 || response.status === 201) {
                    setLoading(false);
                    // extract the message from the response object
                    const responseMessage = response.data.message;
                    navigate(`/verify_account/${responseMessage}`);
                } else if (response.status !== 200 || response.status !== 201) {
                    // extract the message from the response object
                    const responseMessage = response.data.message;
                    setMessage(responseMessage);

                }
                setLoading(false);
            } catch (error) {
                // check if error response exists
                if (error.response && error.response.data) {
                    console.log('Error response data:', error.response.data);

                    // extract the message from the error response object
                    const responseMessage = error.response.data.message || "Something went wrong. Please try again.";
                    // set the message state with the error response data
                    setMessage(responseMessage);
                } else {
                    // set error message
                    setMessage("Something went wrong. Please try again.");
                }
            }
            setLoading(false);
        }
    }

    /**
     *  Handles the form submission for user login
     * 
     * - Uses axios for making HTTP request to backend
     * - Handles the response from the server
     * 
     * @param e the form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default form submission

        try {
            // POST request to the /login url enpoint
            const response = await instance.post('/auth/login', credentials);

            if (response.status === 401) {
                setMessage("Invalid email address or password. Please reset data entered and try again.");
            }

            // check if response exists
            if (response.status === 200 && response.data) {
                setPostActionMessage("Welcome back " + response.data.userName)
                login(response.data.token, response.data.registeredBy, response.data.userName);
            }

        } catch (error) {
            // check if error response exists
            if (error.response && error.response.status === 401) {
                setMessage("Invalid email address or password. Please reset data entered and try again.");
            } else if (error.response && error.response.data) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                setMessage("Unexpected error occurred. Please try again.");
            } else {
                console.error(error);
                setMessage("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <Container id="login_wrapper">
            <Container id="login_container">

                { /************ LOADING SPINNER  ************/}
                {loading ?
                    <Row id="my_applications_spinner_holder">
                        <Spinner animation="border" />
                    </Row>
                    :
                    <Row >
                        <Row className="ps-0">
                            <Form onSubmit={handleSubmit} id="login_form" className="ps-0">
                                <Row className="ps-0">
                                    {/******** { email address } ********/}
                                    <Form.Group controlId="login_email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={(e) => { handleCredentials(e) }}
                                            required
                                        />
                                    </Form.Group>
                                    {emailMessage && <p className="pb-0 mb-0">{emailMessage}</p>}
                                </Row>

                                <Row className="ps-0">
                                    {/******** { password } ********/}
                                    <Form.Group controlId="login_password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={(e) => { handleCredentials(e) }}
                                            required
                                        />
                                    </Form.Group>
                                    {passwordMessage && <p>{passwordMessage}</p>}

                                </Row>
                                <Row id="login_action_holder">
                                    <Col >
                                        <button type="submit" id="login_submit_button" className="btn">LogIn!</button>
                                    </Col>
                                    <Col >
                                        <Link id="signUp" to="/register">SignUp</Link>
                                    </Col>
                                    <a href="#reset_password" id="forgot_password" onClick={resetPassword}>Forgot password</a>
                                </Row>
                            </Form>
                            {message && <p id="login_message">{message}</p>}
                            <div>
                                {/*<SocialLogin></SocialLogin>*/}
                            </div>
                        </Row>
                    </Row>
                }
            </Container>
        </Container>
    )
};

export default Login;