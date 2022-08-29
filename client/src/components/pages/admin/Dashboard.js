/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [isPatient, setIsPatient] = useState(false);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setLastname(decoded.lastname);
            setFirstname(decoded.firstname);
            setIsPatient(decoded.isPatient);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setLastname(decoded.lastname);
            setFirstname(decoded.firstname);
            setIsPatient(decoded.isPatient);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }
    
    const returnFront = async () => {
        navigate("/");
    }

    const createPatient = async () => {
        navigate("/dashboard/createPatient");
    }

    const createRecipe = async () => {
        navigate("/dashboard/createRecipe");
    }


    const logout = async () => {
        axiosJWT.delete('http://localhost:5000/logout', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setToken(null);
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <h1>Bonjour, {lastname} {firstname}</h1>
            <div className="d-flex gap-3 mb-3">
                <div className="justify-content-start gap-3 mb-3">
                    <button onClick={returnFront} className="button is-info">Retour au site</button>
                </div>
                <div className="justify-content-center gap-3 mb-3">
                    <button onClick={createPatient} className="button is-info">Créer un patient</button>
                    <button onClick={createRecipe} className="button is-info">Créer une recette</button>
                </div>
                <div className="justify-content-end gap-3 mb-3">
                    <button onClick={logout} className="button is-info">Se déconnecter</button>
                </div>
            </div>
{!isPatient ? 
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
