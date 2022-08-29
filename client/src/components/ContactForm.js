const ContactForm = () => {
    return (
<div className="section section-padding">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="contact-content">
                                <div className="contact-title">
                                    <h4 className="sub-title">Pas d'inquétude !</h4>
                                    <h2 className="main-title">Vous avez une question ? Contactez-moi.</h2>
                                </div>
                                <div className="form-shuvo">
                                    <form className="contact-form wow fadeInLeft" id="reused_form" action="POST">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group mt-2">
                                                    <input name="name" id="name" type="text" className="form-control" placeholder="Votre nom*" required="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mt-2">
                                                    <input name="email" id="email" type="email" className="form-control" placeholder="Votre adresse mail*" required="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Votre sujet" required="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mt-2">
                                                    <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Votre message..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 text-left mt-4">
                                                <button type="submit" className="btn btn-secondary btn-hover-primary">Envoyer</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/*<div id="success_message" style="display:none; " className="col-md-12 text-success pt-5">
                                    <h3>Your message submit successfully!</h3>
                                </div>
                                <div id="error_message" style="display:none; " className="col-md-12">
                                    <h3>Error</h3> Sorry there was an error sending your form.
                                </div>*/}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-information">
                                <div className="information-wrapper">
                                    <div className="single-info">
                                        <h3 className="info-title">Téléphone :</h3>
                                        <p>06 12 23 45 56</p>
                                    </div>
                                    <div className="single-info">
                                        <h3 className="info-title">Adresse mail :</h3>
                                        <p>contact@sandrine-coupart.com</p>
                                    </div>
                                    <div className="single-info">
                                        <h3 className="info-title">Adresse :</h3>
                                        <p>4 quai de l'Orne, 14118 Caen</p>
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

export default ContactForm;