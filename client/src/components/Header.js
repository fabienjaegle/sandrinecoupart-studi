import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Login from './Login';
import AuthService from '../services/AuthService';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentUser: undefined,
          isNavCollapsed: true,
          show: false
        };

        this.handleNavCollapse = this.handleNavCollapse.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handleNavCollapse() {
        this.setState(state => ({
          isNavCollapsed: !state.isNavCollapsed
        }));
    }

    handleShow() {
        this.setState(state => ({
          show: true
        }));
    }

    handleClose() {
        this.setState(state => ({
          show: false
        }));
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log('user', user);
        if (user) {
          this.setState({
            currentUser: user,
            isNavCollapsed: true,
            show: false
          });
        }
    }
    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, isNavCollapsed, show } = this.state;

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
                                {!currentUser ? (
                                    <div className="header-btn">
                                        <button type="button" className="btn btn-secondary btn-hover-primary" onClick={this.handleShow}>Se connecter</button>
                                    </div>
                                ) : ('')}
                            </div>
                            {currentUser ? (
                                <div className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <NavLink to={"/dashboard"} className="nav-link">
                                            Bonjour, {currentUser.lastname} {currentUser.firstname}
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/" className="nav-link" onClick={this.logOut}>
                                        Se déconnecter
                                        </a>
                                    </li>
                                </div>
                            ) : ('')}
                            
                            {!currentUser ? (
                                <div className="header-toggle d-lg-none">
                                    <button type="button" className="btn btn-secondary btn-hover-primary" onClick={this.handleShow}>Se connecter</button>
                                    <NavLink to={'#'} className="menu-toggle" onClick={this.handleNavCollapse}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </NavLink>
                                </div>
                                ) : ('')
                            }
                            
                            <Modal show={show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Connexion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Login />
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Fermer
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
                <NavLink to={'#'} className="menu-toggle" onClick={this.handleNavCollapse}>
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
}

export default Header