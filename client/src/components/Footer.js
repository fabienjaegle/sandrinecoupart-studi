import React from "react"

class Footer extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataIsLoaded: false
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/recipes/public/excerpt")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataIsLoaded: true
                });
            })
    }
    render() {
        const { DataIsLoaded, items } = this.state;

        return (
            <>
            <div className="section footer-section">
                <div className="footer-widget-section section-padding">
                    <div className="container">
                        <div className="footer-widget-wrapper">
                            <div className="row">
                                <div className="col-lg-4">
                                    {/*<div className="footer-widget">
                                        <h3 className="footer-widget-title">Subscribe Newsletter</h3>

                                        <div className="widget-newsletter">
                                            <p>Lorem Ipsum has been them an industry printer took a galley make book.</p>

                                            <div className="newsletter-form">
                                                <form action="#">
                                                    <input type="text" placeholder="Enter email" />
                                                    <button className="btn btn-primary btn-hover-white">Subscribe Now</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>
                                <div className="col-lg-8">
                                    <div className="widget-wrapper">
                                        <div className="footer-widget">
                                            {!DataIsLoaded ? <h3 className="footer-widget-title">Chargement en cours...</h3> : 
                                            <>
                                                <h3 className="footer-widget-title">Dernières recettes</h3>

                                                <ul className="widget-link">
                                                    {
                                                        items.map((item) => ( 
                                                            <li key={item.id}><a href={`/recipe/${item.id}`}>{ item.title }</a></li>
                                                        ))
                                                    }
                                                </ul>
                                            </>
                                            }
                                        </div>
                                        <div className="footer-widget">
                                            <h3 className="footer-widget-title">Liens utiles</h3>

                                            <ul className="widget-link">
                                                <li><a href="/private-policy">Politique de confidentialité</a></li>
                                                <li><a href="/terms">Mentions légales</a></li>
                                                <li><a href="#services">Mes services</a></li>
                                                <li><a href="#about">A propos</a></li>
                                                <li><a href="#">Les ateliers</a></li>
                                            </ul>
                                        </div>
                                        <div className="footer-widget">
                                            <h3 className="footer-widget-title">Horaires</h3>

                                            <ul className="widget-link">
                                                <li>Lun-Ven : 9h – 18h</li>
                                                <li>Sam : 9h – 13h</li>
                                            </ul>

                                            <div className="widget-location">
                                                <h3 className="footer-widget-title">Adresse</h3>

                                                <p>10 Quai de l'Orne<br /> 14000 Caen</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
        
            <a href="#" className="back-to-top">
                <i className="icofont-simple-up"></i>
            </a>

            </>
        )
    }
}

export default Footer