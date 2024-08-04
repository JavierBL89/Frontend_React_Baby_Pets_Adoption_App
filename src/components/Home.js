import React, { useContext, useEffect, useCallback } from "react";

import catTagsData from "../catTagsData";
import dogTagsData from "../dogTagsData";

import { Container, Row, Stack, Spinner } from "react-bootstrap";
import PetCategoriesHolder from "./pet/components/pet_categories/PetCategoriesHolder";
import AdoptionInfoComponent from "./AdoptionInfoComponent";
import WelcomeComponent from "./WelcomeComponent";
import useFetchPets from "./hooks/data/fetchPets";
import { DataPetContext } from "../context/DataPetContext";
import PetTagsHolder from "./pet/components/pet_search/PetTagsHolder";
import PetListingHolder from "./pet/components/pet_listing/PetListingHolder";
import TextComponent from "./common/TextComponent";


/***
 * Component is the core part of the application, the landing page.
 * 
 * It handles user authentication state and is built up with other components that bring key functionalities.
 * 
 * It displays the pet categories and handles fucntionalit to allow users to select a category and fetch pets available using 
 * the  'useFetch' hook which in addition is listention to 'loadMore' action to perform another fecth using pagination
 * 
 */
const Home = () => {
    // use DataPetContext
    const { currentPetCategory, petsData, setCurrentPetCategory, resetPetsData, setTagsList } = useContext(DataPetContext);
    // use useFetchPets hook for fetching pets
    const { loading, message, error, totalPages, loadMore, pages } = useFetchPets();
    // set token on localstorage
    const token = localStorage.getItem("token")


    /***
       * useEffect resets data to empty on every render
       */
    useEffect(() => {
        resetPetsData();
    }, [resetPetsData, setTagsList]);

    /**
       * Sets category state based on user selection
       * 
       * @params title - the title of the pet category
       */
    const handleCategory = useCallback((title) => {
        setCurrentPetCategory(title.toLowerCase());  // update category state when user selects a pet category to be passed to PetDataContext

    }, [setCurrentPetCategory]);



    return (

        <Stack>
            <WelcomeComponent token={token} />
            <PetCategoriesHolder handleClick={handleCategory} />
            <Container >
                {loading &&
                    <Row id="petListing_spinner_holder">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                }
                {error && <p>Error fetching pets. Please try later</p>}
                {error && console.log("Error fetching pets: ", { error })}
                {petsData.length > 0 ? (
                    <Container>
                        {currentPetCategory === "puppies"
                            ?
                            <PetTagsHolder petTagsData={dogTagsData} petCategory={currentPetCategory} />
                            :
                            <PetTagsHolder petTagsData={catTagsData} petCategory={currentPetCategory} />
                        }

                        <PetListingHolder />
                        <Row >
                            <button id="load_more_button" onClick={loadMore} disabled={pages[currentPetCategory]?.page >= totalPages - 1}>More Pets</button>
                        </Row>
                    </Container>
                ) :
                    !loading && message && <TextComponent text="Not data found" id="no_pets_found_text" />
                }
            </Container>
            <AdoptionInfoComponent />
        </Stack>


    )
}

export default Home;