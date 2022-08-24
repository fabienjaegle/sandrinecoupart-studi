import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../Header";
import RecipeDetail from '../RecipeDetail';
import Footer from "../Footer";
import Breadcrumb from "../Breadcrumb";

function Recipe(props) {
    const { id } = useParams();

    const [recipe, setRecipe] = React.useState(null);

    React.useEffect(() => {
        axios.post('http://localhost:5000/recipes/public/full', {
            recipeid: id
        }).then((response) => {
            setRecipe(response.data);
        });
    });

    if (!recipe) return null;

    return(
        <>
        <Header />
        <Breadcrumb title={recipe.title} />
        <RecipeDetail recipe={recipe} />
        <Footer />
        </>
    )
}

export default Recipe