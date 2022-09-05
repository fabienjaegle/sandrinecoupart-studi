import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../Header";
import RecipeDetail from '../RecipeDetail';
import Footer from "../Footer";
import Breadcrumb from "../Breadcrumb";
import AuthService from '../../services/auth.service';

function Recipe(props) {
    const { id } = useParams();

    const [recipe, setRecipe] = React.useState(null);

    React.useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            axios.post('http://localhost:5000/recipes/private/full', {
                recipeid: id,
                userid: currentUser.id
            }).then((response) => {
                setRecipe(response.data.recipe);
            });
        } else {
            axios.post('http://localhost:5000/recipes/public/full', {
                recipeid: id
            }).then((response) => {
                setRecipe(response.data);
            });
        }
    }, [id]);

    if (!recipe) return null;

    return(
        <>
        <Header />
        <Breadcrumb title={recipe.title} />
        <RecipeDetail id={id} />
        <Footer />
        </>
    )
}

export default Recipe