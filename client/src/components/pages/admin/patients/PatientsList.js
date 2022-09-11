import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../../../services/user.service';
import AuthService from '../../../../services/auth.service';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser();
        getPatients();
    });

    const getCurrentUser = () => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            navigate("/");
        }
    }

    const getPatients = () => {
        UserService.getPatients()
        .then(response => {
            setPatients(response.data);
        });
    }
    
    const returnDashboard = () => {
        navigate("/admin");
    }

    const createPatient = () => {
        navigate("/admin/patients/add");
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
                    <button onClick={createPatient} className="button is-info">Créer un patient</button>
                </div>
                <div className="justify-content-end gap-3 mb-3">
                    <button onClick={logout} className="button is-info">Se déconnecter</button>
                </div>
            </div>

            <h2>Tous les patients</h2>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.lastname}</td>
                            <td>{patient.firstname}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default PatientsList;