import React from "react"
import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <>
        <div className="section footer-section">
            <div className="footer-copyright">
                <div className="container">
                    <div className="copyright-wrapper">
                        <div className="copyright-text">
                            <p>&copy; 2022 <span> Sandrine Coupart</span>. Tous droits réservés.</p>
                        </div>

                        <div className="copyright-link">
                            <a href="/terms">Mentions légales</a>
                            <a href="/private-policy">Politique de confidentialité</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <NavLink to={'#'} className="back-to-top">
            <i className="icofont-simple-up"></i>
        </NavLink>

        </>
    )
}

export default Footer