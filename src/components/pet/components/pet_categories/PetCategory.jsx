import React from "react";
import { Container } from "react-bootstrap";



/**
 * Component represents a pet category
 * 
 * When clicked, it triggers an action to update the current pet category in the application state
 *
 * @param {function} onClick - the function called when the category is clicked
 * @param {string} title - the title of the pet category
 */

const PetCategory = ({ onClick, title }) => {


    return (

        <Container >
            <Container onClick={() => onClick(title)}
                title={title}
                id={`category_${title}`}
                className="pt-5 pb-5"
                style={{ cursor: 'pointer' }}
            >
            </Container>
            <h6 className="category_tittle">{title}</h6>

        </Container>



    )
};
export default PetCategory;