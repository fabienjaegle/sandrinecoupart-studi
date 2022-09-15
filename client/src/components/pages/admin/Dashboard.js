/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/user.service';
import AuthService from '../../../services/auth.service';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser();
        getUsers();
    }, []);

    const getCurrentUser = async () => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser && !currentUser.isPatient) {
            setCurrentUser(currentUser);
        }else {
            navigate("/");
        }
    }

    const getUsers = async () => {
        UserService.getUsers().then(response => {
            setUsers(response.data);
        });
    }
    
    const returnFront = async () => {
        navigate("/");
    }

    const patientsList = async () => {
        navigate("/admin/patients/list");
    }

    const recipesList = async () => {
        navigate("/admin/recipes/list");
    }

    const logout = async () => {
        AuthService.logout();
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <h1>Bonjour, {currentUser?.firstname} {currentUser?.lastname}</h1>
            <div className="d-flex gap-3 mb-3">
                <div className="justify-content-start gap-3 mb-3">
                    <button onClick={returnFront} className="button is-info">Retour au site</button>
                </div>
                {!currentUser?.isPatient ?
                    <div className="justify-content-center gap-3 mb-3">
                        <button onClick={patientsList} className="button is-info">Liste des patients</button>
                        <button onClick={recipesList} className="button is-info">Liste des recettes</button>
                    </div>
                : ''}
                <div className="justify-content-end gap-3 mb-3">
                    <button onClick={logout} className="button is-info">Se déconnecter</button>
                </div>
            </div>
            {!currentUser?.isPatient ? 
            <>
                <h2>Tous les utilisateurs</h2>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Est un patient ?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>{user.isPatient ? 'Oui' : 'Non'}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </>
            : ''}
        </div>
    )
}

export default Dashboard
