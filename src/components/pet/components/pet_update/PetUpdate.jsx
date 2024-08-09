import React from "react";
import { Container, Row } from "react-bootstrap";
import PetUpdateForm from "./PetUpdateForm";

/***
 * Coponent as main core for PetUpdate section
 */
const PetUpdate = () => {

    return (
        <Container id="update_pet_wrapper">
            <Container id="update_pet_container">

                <Row>
                    <PetUpdateForm />
                </Row>
            </Container>
        </Container>

    )

};

export default PetUpdate;