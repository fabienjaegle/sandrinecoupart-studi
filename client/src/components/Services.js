const Services = () => {
    return (
        <div id="services" className="section section-padding">
        <div className="container">
            <div className="section-title">
                <h2 className="main-title">Mes services</h2>
            </div>
            <div className="features-wrapper">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature">
                            <div className="feature-icon">
                                <span><i className="flaticon-lunges"></i></span>
                            </div>
                            <div className="feature-content">
                                <div className="content-wrapper">
                                    <h4 className="title">Bilan nutritionnel & mesures impédancemétriques</h4>
                                    <p>Le bilan a pour but de faire le point sur votre état de santé, vos besoins nutritionnels, vos attentes & objectifs, vos habitudes alimentaires et l'histoire de votre poids.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature">
                            <div className="feature-icon">
                                <span><i className="flaticon-lotus"></i></span>
                            </div>
                            <div className="feature-content">
                                <div className="content-wrapper">
                                    <h4 className="title">Accompagnement & coaching courses</h4>
                                    <p>Je vous propose de vous accompagner durant vos courses dans le but de déjouer les pièges marketing, de choisir des produits équilibrés et à moindre coût mais surtout pour vous aider à déchiffrer les étiquettes nutritionnelles.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature">
                            <div className="feature-icon">
                                <span><i className="flaticon-computer"></i></span>
                            </div>
                            <div className="feature-content">
                                <div className="content-wrapper">
                                    <h4 className="title">Ateliers diététiques</h4>
                                    <p>Ces ateliers sont destinés à vous faire acquérir des habitudes culinaires et à vous faire cuisiner simplement & rapidement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Services;