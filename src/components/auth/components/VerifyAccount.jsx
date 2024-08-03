import React from "react";
import { Container } from "react-bootstrap";
import Heading from "../../common/Heading";
import { useParams } from "react-router-dom";



const VerifyAccount = () => {

    const { message } = useParams();
    return (
        <Container id="very_account_wrapper" className="">
            <Container id="very_account_container">
                {message ?
                    <>
                        <Heading tagName="h2" id="" text={message} />
                    </>
                    :
                    <>
                        <Heading tagName="h2" id="" text="Account verification Needed" />
                        <Heading tagName="h3" id="" text="Please check inbox of the email address account entered" />
                    </>
                }

            </Container>
        </Container>
    );
};


export default VerifyAccount;