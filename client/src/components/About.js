const About = () => {
    return (
        <div id="about" className="section section-padding bg-grey overflow-hidden">
            <div className="container">
                <div className="section-title">
                    <h6 className="sub-title">Présentation</h6>
                    <h2 className="main-title">A propos</h2>
                </div>
                <div className="about-wrapper">
                    <div className="row align-items-center gx-xxl-5">
                        <div className="col-lg-5">
                            <div className="about-images">
                                <div className="images">
                                    <img src="assets/images/about.jpg" alt="About" />
                                </div>
                                <div className="about-btn">
                                    <a href="/contact" className="btn btn-primary btn-hover-secondary">Me contacter</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="about-content bg-white">
                                <div className="content-wrapper">
                                    <h6 className="sub-title">Un programme nutritionnel adaptés à vos besoins</h6>
                                    <h2 className="main-title">Je vous propose une prise en charge individualisée.</h2>
                                    <p>J'interviens auprès de tout public de l'enfant à la personne âgée désireux de conseils nutritionnels pour améliorer leur alimentation, mais aussi aux personnes nécessitant une prise en charge nutritionnelle relative à leur pathologie.​</p>
                                    <span className="count">+ de 100 ateliers dispensés</span>
                                    <p>Je propose également des ateliers permettant de passer de la théorie à la pratique afin de vous familiariser avec le monde de la nutrition.</p>
                                    <p>N'hésitez pas à vous inscrire pour la prochaine session en me contactant.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About