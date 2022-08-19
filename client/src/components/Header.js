import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
                                <li><NavLink to='/' activeClassName="active">Accueil</NavLink></li>
                                <li><NavLink to='/recipes' activeClassName="active">Mes recettes</NavLink></li>
                                <li><NavLink to='/contact' activeClassName="active">Me contacter</NavLink></li>
                            </ul>

                            <div className="header-btn">
                                <a className="btn btn-secondary btn-hover-primary" href="/login">Se connecter</a>
                            </div>
                        </div>

                        <div className="header-toggle d-lg-none">

                            <a className="btn btn-secondary btn-hover-primary" href="/login">Se connecter</a>
                            <NavLink to={'#'} className="menu-toggle" onClick={handleNavCollapse}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </NavLink>
                        </div>
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
                    <li><NavLink to='/' activeClassName="active">Accueil</NavLink></li>
                    <li><NavLink to='/recipes' activeClassName="active">Mes recettes</NavLink></li>
                    <li><NavLink to='/contact' activeClassName="active">Me contacter</NavLink></li>
                </ul>
            </div>
        </div>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}></div>
		</>
    )
}

export default Header