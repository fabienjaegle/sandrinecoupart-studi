import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(username, password)
            .then((result) => {
                navigate("/dashboard");
            });
            
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (

        <form onSubmit={Auth}>
            <p className="has-text-centered">{msg}</p>
            <div className="row">
                <div className="col-md-6">
                    <div className="single-form">
                        <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-form">
                        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <div className="col-md-12 pt-4">
                    <div className="single-form">
                        <button className="btn btn-dark btn-hover-primary">Se connecter</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login;
