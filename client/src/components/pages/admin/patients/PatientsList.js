import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import UserService from '../../../../services/user.service';
import AuthService from '../../../../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmation from '../../../DeleteConfirmation';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser();
        getPatients();
    }, []);

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
 
    const showDeleteModal = (id) => {
        setId(id);
        setMessage(null);
        setDeleteMessage(`Etes-vous sur de vouloir supprimer le patient '${patients.find((x) => x.id === id).firstname} ${patients.find((x) => x.id === id).lastname}' ?`);
    
        setDisplayConfirmationModal(true);
    };
 
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const submitDelete = (id) => {
        console.log(id);
        UserService.deletePatient(id).then(response => {
            if (response.status === 200) {
                setMessage(`Le patient '${patients.find((x) => x.id === id).firstname} ${patients.find((x) => x.id === id).lastname}' a été supprimé avec succès.`);
                setPatients(patients.filter((patient) => patient.id !== id));
            }else {
                console.log('error');
                setError(`Une erreur est survenue lors de la suppression du patient : ${response.data.msg}`);
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
                    <button onClick={createPatient} className="button is-info">Créer un patient</button>
                </div>
                <div className="justify-content-end gap-3 mb-3">
                    <button onClick={logout} className="button is-info">Se déconnecter</button>
                </div>
            </div>

            <h2>Tous les patients</h2>
            {message && <Alert variant="success">{message}</Alert>}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length === 0 ? <tr><td colSpan={4} className="text-center">Aucun patient</td></tr> : ''}
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.lastname}</td>
                            <td>{patient.firstname}</td>
                            <td>
                                <a href={`/admin/patients/edit/${patient.id}`}><FontAwesomeIcon icon={faPen} /></a>&nbsp;
                                <span role="button"><FontAwesomeIcon icon={faTrash} className="text-danger" onClick={() => showDeleteModal(patient.id)} /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
        </div>
    )
}

export default PatientsList;