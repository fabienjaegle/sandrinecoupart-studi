import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Login from './Login';

const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [show, setShow] = useState(false);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
		<>
        <div className="header section">
            <div className="header-main">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="header-logo">
                            <a href="/">Sandrine Coupart</a>
                        </div>
                        <div className="header-menu d-none d-lg-flex">
                            <ul className="nav-menu">
                                <li><NavLink to='/' activeclassname="active">Accueil</NavLink></li>
                                <li><NavLink to='/recipes' activeclassname="active">Mes recettes</NavLink></li>
                                <li><NavLink to='/contact' activeclassname="active">Me contacter</NavLink></li>
                            </ul>

                            <div className="header-btn">
                                <button type="button" className="btn btn-secondary btn-hover-primary" onClick={handleShow}>Se connecter</button>
                            </div>
                        </div>

                        <div className="header-toggle d-lg-none">
                            <button type="button" className="btn btn-secondary btn-hover-primary" onClick={handleShow}>Se connecter</button>
                            <NavLink to={'#'} className="menu-toggle" onClick={handleNavCollapse}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </NavLink>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Connexion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Login />
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Fermer
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
            <NavLink to={'#'} className="menu-toggle" onClick={handleNavCollapse}>
                <i className="icofont-close-line"></i>
            </NavLink>

            <div className="mobile-menu-items">
                <ul className="nav-menu">
                    <li><NavLink to='/' activeclassname="active">Accueil</NavLink></li>
                    <li><NavLink to='/recipes' activeclassname="active">Mes recettes</NavLink></li>
                    <li><NavLink to='/contact' activeclassname="active">Me contacter</NavLink></li>
                </ul>
            </div>
        </div>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}></div>
		</>
    )
}

export default Header