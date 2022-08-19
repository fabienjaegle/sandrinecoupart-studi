const About = () => {
    return (
        <div id="about" class="section section-padding bg-grey overflow-hidden">
            <div class="container">
                <div className="section-title">
                    <h6 className="sub-title">Présentation</h6>
                    <h2 className="main-title">A propos</h2>
                </div>
                <div class="about-wrapper">
                    <div class="row align-items-center gx-xxl-5">
                        <div class="col-lg-5">
                            <div class="about-images">
                                <div class="images">
                                    <img src="assets/images/about.jpg" alt="About" />
                                </div>
                                <div class="about-btn">
                                    <a href="/contact" class="btn btn-primary btn-hover-secondary">Me contacter</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="about-content bg-white">
                                <div class="content-wrapper">
                                    <h6 class="sub-title">Un programme nutritionnel adaptés à vos besoins</h6>
                                    <h2 class="main-title">Je vous propose une prise en charge individualisée.</h2>
                                    <p>J'interviens auprès de tout public de l'enfant à la personne âgée désireux de conseils nutritionnels pour améliorer leur alimentation, mais aussi aux personnes nécessitant une prise en charge nutritionnelle relative à leur pathologie.​</p>
                                    <span class="count">+ de 100 ateliers dispensés</span>
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