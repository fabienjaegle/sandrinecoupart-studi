import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Login from './Login';
import AuthService from '../services/auth.service';
import $ from 'jquery';

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

        if (user) {
          this.setState({
            currentUser: user,
            isNavCollapsed: true,
            show: false
          });
        }

        function menuScript() {

            $('.menu-toggle').on('click', function(){
                $('.mobile-menu').addClass('open')
                $('.overlay').addClass('open')
            });
            
            $('.menu-close').on('click', function(){
                $('.mobile-menu').removeClass('open')
                $('.overlay').removeClass('open')
            });
            
            $('.overlay').on('click', function(){
                $('.mobile-menu').removeClass('open')
                $('.overlay').removeClass('open')
            });
            
            /*Variables*/
            var $offCanvasNav = $('.mobile-menu-items'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
    
            /*Add Toggle Button With Off Canvas Sub Menu*/
            $offCanvasNavSubMenu.parent().prepend('<span class="mobile-menu-expand"></span>');
    
            /*Close Off Canvas Sub Menu*/
            $offCanvasNavSubMenu.slideUp();
    
            /*Category Sub Menu Toggle*/
            $offCanvasNav.on('click', 'li a, li .mobile-menu-expand, li .menu-title', function(e) {
                var $this = $(this);
                if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('mobile-menu-expand'))) {
                    e.preventDefault();
                    if ($this.siblings('ul:visible').length) {
                        $this.parent('li').removeClass('active-expand');
                        $this.siblings('ul').slideUp();
                    } else {
                        $this.parent('li').addClass('active-expand');
                        $this.closest('li').siblings('li').find('ul:visible').slideUp();
                        $this.closest('li').siblings('li').removeClass('active-expand');
                        $this.siblings('ul').slideDown();
                    }
                }
            });
    
            $( ".sub-menu" ).parent( "li" ).addClass( "menu-item-has-children" );
        }
        menuScript();

        $(window).on('scroll', function(event) {    
            var scroll = $(window).scrollTop();
            if (scroll <= 100) {
                $(".header-main").removeClass("sticky");
            } else{
                $(".header-main").addClass("sticky");
            }
        });
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
                                        Bonjour, {currentUser.lastname} {currentUser.firstname}
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