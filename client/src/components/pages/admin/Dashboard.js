/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
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
            <button onClick={createPatient} className="button is-info">Créer un patient</button>
            <button onClick={createRecipe} className="button is-info">Créer une recette</button>
            <button onClick={logout} className="button is-info">Se déconnecter</button>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Lastname</th>
                        <th>Firstname</th>
                        <th>Is Patient</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.lastname}</td>
                            <td>{user.firstname}</td>
                            <td>{user.isPatient ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Dashboard