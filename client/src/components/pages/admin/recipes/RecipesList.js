import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../../../services/user.service';
import AuthService from '../../../../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser();
        getRecipes();
    }, []);

    const getCurrentUser = () => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            navigate("/");
        }
    }

    const getRecipes = () => {
        UserService.getRecipes()
        .then(response => {
            setRecipes(response.data);
        });
    }
    
    const returnDashboard = () => {
        navigate("/admin");
    }

    const createRecipe = () => {
        navigate("/admin/recipes/add");
    }

    const logout = async () => {
        AuthService.logout();
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <div className="d-flex gap-3 mb-3">
                <div className="justify-content-start gap-3 mb-3">
                    <button onClick={returnDashboard} className="button is-info">Retour</button>
                </div>
                <div className="justify-content-center gap-3 mb-3">
                    <button onClick={createRecipe} className="button is-info">Créer une recette</button>
                </div>
                <div className="justify-content-end gap-3 mb-3">
                    <button onClick={logout} className="button is-info">Se déconnecter</button>
                </div>
            </div>

            <h2>Toutes les recettes</h2>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>Temps de préparation</th>
                        <th>Temps de cuisson</th>
                        <th>Temps de repos</th>
                        <th>Pour les patients ?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{recipe.id}</td>
                            <td>{recipe.title}</td>
                            <td>{recipe.prepTimeInMinutes}</td>
                            <td>{recipe.cookTimeInMinutes}</td>
                            <td>{recipe.restTimeInMinutes}</td>
                            <td>{recipe.forPatient ? 'Oui' : 'Non'}</td>
                            <td><a href={`/admin/recipes/edit/${recipe.id}`}><FontAwesomeIcon icon={faPen} /></a></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default RecipesList;