import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Hero.css'

const Hero = () => {
    return (
        <div className="slider-section section">
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide single-slider d-flex align-items-center hero-img">
                    <div className="container">
                        <div className="slider-content">
                            <h6 className="sub-title">Diététicienne nutritionniste</h6>
                            <h1 className="main-title">"Que votre alimentation soit votre première médecine"</h1>
                            <p>Hippocrate</p>
                            <a href="#services" className="btn btn-primary btn-hover-secondary">Mes services</a>
                        </div>
                    </div>

                    <div className="slider-social">
                        <div className="container">
                            <div className="social-wrapper">
                                <p>Me suivre sur les réseaux sociaux :</p>
                                <ul className="social">
                                    <li><a href="/"><FontAwesomeIcon icon={faTwitter} /></a></li>
                                    <li><a href="/"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                    <li><a href="/"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                    <li><a href="/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Hero;