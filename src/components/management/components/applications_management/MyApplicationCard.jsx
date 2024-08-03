import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import ImageComponent from "../../../common/ImageComponent";
import TextComponent from "../../../common/TextComponent";


/***
 * Component to visually represent adoption application data as a card
 */
const MyApplicationCard = ({ applicationDate, id, applicationId, petId, price,
    location, onDelete, onUpdate, motherImg, motherBreed, ownerName, status }) => {

    return (

        <Container id={`application_wrapper_${id}`} className="applicationCard_wrapper">
            <Container id={`application_container_${id}`} className="applicationCard_container">
                <Row >
                    {/******* Mother's Image *******/}
                    <Col xs={12} md={5} className="application_img_holder">
                        <ImageComponent src={motherImg} className={""} alt={motherBreed} />
                    </Col>

                    {/******* Application details *******/}
                    <Col xs={12} md={7}>
                        <Row className="application_details_row">
                            <Col >
                                <Row>
                                    <Col xs={12} > <small >Applied On:</small></Col>
                                    <Col className="ps-0">
                                        <TextComponent text={`${applicationDate[2]}/${applicationDate[1]}/${applicationDate[0]}`} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row>
                                    <Col xs={12} ><small >Status:</small></Col>
                                    <Col className="ps-0"> <TextComponent text={status} /></Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="application_details_row">
                            {/******* Owner Name *******/}
                            <Col >
                                <Row>
                                    <Col xs={12}> <small >Owner's Name:</small></Col>
                                    <Col className="ps-0" > <TextComponent text={ownerName} /></Col>
                                </Row>

                            </Col>
                            {/******* Location *******/}
                            <Col >
                                <Row>
                                    <Col xs={12} > <small >Pet's Location</small></Col>
                                    <Col className="ps-0"> <TextComponent text={location} /></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="application_details_row">
                            <Col xs={8}>
                                <Row >
                                    <Col xs={3}> <small id="my_app_price">Price</small></Col>
                                    <Col xs={9}> {price ? <p>{price}€</p> : <TextComponent id="my_app_free_adoption" text="Free Adoption" />} </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="application_drop_holder">
                    {/******* Drop app button *******/}
                    <Col className="p-0 m-0">
                        <Row >
                            <Dropdown className="p-0 m-0">
                                <Dropdown.Toggle className="drop_application_dropdown no-arrow ">
                                    Drop
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as="div">
                                        <TextComponent className="drop_application_warning" text="All data related to this application will be deleted, and application will not be recoverable." />
                                        <TextComponent onClick={() => onDelete(applicationId)} text="Confirm" className="btn btn-primary drop_application_confirm" />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>

                    </Col>

                </Row>
            </Container>

        </Container>
    );

};


export default MyApplicationCard;