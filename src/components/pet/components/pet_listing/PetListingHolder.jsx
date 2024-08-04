import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import PetCard from "../pet_listing/PetCard";

import { DataPetContext } from "../../../../context/DataPetContext";


/***
 * Component responsible for holding the a list pf pet cards 
 * and manage the layout by mapping through the list of pets
 * and display cards of pet by rows and columns
 */
const PetListingHolder = () => {

    const { petsData } = useContext(DataPetContext);


    return (
        <Container className="" id="pet_listing_wrapper">
            <Container className="" id="pet_listing_container">
                <Row className="">
                    {petsData && petsData.map((pet, index) => (
                        <Col key={index} xs={12} md={5} lg={4} className="p-1 mb-2">
                            <PetCard
                                petId={pet.id}
                                location={pet.location}
                                price={pet.price}
                                img={pet.motherImg ? pet.motherImg : "https://res.cloudinary.com/dthlibbj7/image/upload/c_crop,h_364,w_436/v1718832895/depositphotos_318221368-stock-illustration-missing-picture-page-for-website_jur5he.webp"}
                                breed={pet.motherBreed}
                            />
                        </Col>
                    ))}
                </Row>

            </Container>
        </Container>
    );
};

export default PetListingHolder;