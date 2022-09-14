import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import UserService from '../../../../services/user.service';
import AuthService from '../../../../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmation from '../../../DeleteConfirmation';

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
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

    const showDeleteModal = (id) => {
        setId(id);
        setMessage(null);
        setDeleteMessage(`Etes-vous sur de vouloir supprimer la recette '${recipes.find((x) => x.id === id).title}' ?`);
    
        setDisplayConfirmationModal(true);
    };
 
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const submitDelete = (id) => {
        console.log(id);
        UserService.deleteRecipe(id).then(response => {
            if (response.status === 200) {
                setMessage(`La recette '${recipes.find((x) => x.id === id).title}' a été supprimée avec succès.`);
                setRecipes(recipes.filter((recipe) => recipe.id !== id));
            }else {
                console.log('error');
                setError(`Une erreur est survenue lors de la suppression de la recette : ${response.data.msg}`);
            }
        });

        setDisplayConfirmationModal(false);
    };

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
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
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
                    {recipes.length === 0 ? <tr><td colSpan={7} className="text-center">Aucune recette</td></tr> : ''}
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{recipe.id}</td>
                            <td>{recipe.title}</td>
                            <td>{recipe.prepTimeInMinutes}</td>
                            <td>{recipe.cookTimeInMinutes}</td>
                            <td>{recipe.restTimeInMinutes}</td>
                            <td>{recipe.forPatient ? 'Oui' : 'Non'}</td>
                            <td>
                                <a href={`/admin/recipes/edit/${recipe.id}`}><FontAwesomeIcon icon={faPen} /></a>&nbsp;
                                <span role="button"><FontAwesomeIcon icon={faTrash} className="text-danger" onClick={() => showDeleteModal(recipe.id)} /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
        </div>
    )
}

export default RecipesList;