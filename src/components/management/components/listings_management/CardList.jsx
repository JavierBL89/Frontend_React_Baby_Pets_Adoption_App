import React, { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Dropdown } from "react-bootstrap";
import ImageComponent from "../../../common/ImageComponent";
import TextComponent from "../../../common/TextComponent";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import NotificationBadge from "../../../notifications/components/NotificationBadge";
import { Link } from "react-router-dom";


/***
 * The CardList represents a card to display information about  apet listings visually organized and appealing
 * It includes various details such as the mother's image, birth date, creation date, price, 
 * and status of the pet. It also provides action buttons for updating and deleting the pet listing. 
 * 
 * Additionally, there is a link to view all pet applications
 */
const CardList = ({ motherImage, motherBreed, createdOn, price, token,
    birthDate, id, petId, onDelete, onUpdate, petListing, petCreatedOn, petUpdatedOn }) => {

    const [viewApplication, setviewApplication] = useState(false);
    const [category, setCategory] = useState("");


    /****
     * useEffect to set set the category to macth the backend category name 
     * for the url that retrieves the details of a secific pet.
     * 
     * The variable is used for the pet image link
     */
    useEffect(() => {
        if (petListing.pet.category === "cat") {
            setCategory("kitties");
        }
        if (petListing.pet.category === "dog") {
            setCategory("puppies");
        }
    }, [setCategory, petListing]);

    /**** 
     * Method toggles the view application accordion.
     * 
     * Sets the state to the oposite of the current state is
     * false to true | true to false
    */
    const viewToggle = () => {
        setviewApplication(!viewApplication);
    }


    return (

        <Container id={`myPetCard_wrapper_${id}`} className="myPetCard_wrapper">
            <Container id={`myPetCard_container_${id}`} className="myPetCard_container">
                {/******* See Pet Applications Button *******/}
                <Row className="view_pet_applications_link_holder">

                    <Col className="view_pet_applications_link">
                        {petListing.pendingNotifications.length > 0 &&
                            <NotificationBadge text={"+" + petListing.pendingNotifications.length} />
                        }
                        <Link to={`/pet_applications/${petId}/${token}`} >
                            <small >See applications</small>
                        </Link>

                    </Col>

                </Row>
                <Row className="myPetCard_body">
                    {/******* Mother's Image *******/}
                    <Col xs={12} md={4} className="myPetCard_img_holder">
                        <Link to={`/pets/${category}/view/${petListing.pet.id}`} >
                            <ImageComponent src={motherImage} className={""} alt={`Image of a ${petListing.pet.category}`} />
                        </Link>
                    </Col>

                    {/******* Birth and Status details *******/}
                    <Col xs={12} md={8} className="pt-1">
                        <span hidden ></span>
                        <Row className="myPetCard_details_row">
                            <Col >
                                <Row>
                                    <Col xs={12} md={6}> <small >Birth date:</small></Col>
                                    <Col xs={12} md={6}> <TextComponent text={`${birthDate[1]}/${birthDate[0]}`} /></Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row>
                                    <Col xs={12} md={4}><small >Status:</small></Col>
                                    <Col xs={12} md={8}> <TextComponent text="Available" /></Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="myPetCard_details_row">
                            {/******* Action buttons *******/}
                            <Col >
                                <Row>
                                    <Col xs={12} md={6}> <small >Created on:</small></Col>

                                    <Col xs={12} md={6}> <TextComponent text={petCreatedOn} /></Col>
                                </Row>

                            </Col>
                            {/******* Conditional Offer Type Rendering *******/}
                            <Col >
                                {price ?
                                    <Row>
                                        <Col xs={12} md={4}> <small >Price:</small></Col>
                                        <Col xs={12} md={8}> <TextComponent text={price.toString() + "€"} /></Col>
                                    </Row>
                                    :
                                    <Row>

                                        <Col xs={12} md={8}> <TextComponent text={"Free adoption"} /></Col>
                                    </Row>
                                }

                            </Col>
                        </Row>

                        <Row className="myPetCard_details_row">

                            {/******* Updated On *******/}
                            <Col >
                                <Row>
                                    <Col xs={12} md={7}> <small >Updated on:</small></Col>
                                    <Col xs={12} md={5}> <TextComponent text={petUpdatedOn ? petUpdatedOn : "N/S"} /></Col>
                                </Row>
                            </Col>
                            {/******* Action buttons *******/}
                            <Col >
                                <Row >
                                    <Col xs={4}>
                                        <FaEdit onClick={() => onUpdate(petListing.pet, petListing.id)} className="update_listing" />
                                    </Col>
                                    <Col xs={4} >
                                        <MdOutlineDelete onClick={() => viewToggle()} className="delete_listing" />


                                    </Col>
                                </Row>

                            </Col>

                        </Row>
                    </Col>


                </Row>

                {viewApplication ?
                    <Row className="drop_petList_accordion_wrapper">
                        <TextComponent className="drop_petList_warning_text" text="All data related to this application will be deleted, and application will not be recoverable." />
                        <TextComponent onClick={() => onDelete(petListing.id)} text="Confirm" className="btn drop_petList_confirm_button" />

                    </Row>
                    :
                    null
                }
            </Container>

        </Container>
    );

};


export default CardList;