import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import $ from 'jquery';

const Footer = () => {

    useEffect(() => {
        // Show or hide the sticky footer button
        $(window).on('scroll', function (event) {
            if ($(this).scrollTop() > 600) {
                $('.back-to-top').fadeIn(200)
            } else {
                $('.back-to-top').fadeOut(200)
            }
        });

        //Animate the scroll to top
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0,
            }, 300);
        });
    })
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