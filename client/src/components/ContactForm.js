const ContactForm = () => {
    return (
<div className="section section-padding">
            <div className="container">

                <div className="contact-wrapper">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="contact-content">

                                <div className="contact-title">
                                    <h4 className="sub-title">Don’t worry!</h4>
                                    <h2 className="main-title">If you have any query? Contact with us.</h2>
                                </div>
                                    
                                <div className="form-shuvo">
                                    <form className="contact-form wow fadeInLeft" id="reused_form" action="POST">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group mt-2">
                                                    <input name="name" id="name" type="text" className="form-control" placeholder="Your Name*" required="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mt-2">
                                                    <input name="email" id="email" type="email" className="form-control" placeholder="Your Email*" required="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Your Subject.." required="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mt-2">
                                                    <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Your message..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 text-left mt-4">
                                                <button type="submit" className="btn btn-secondary btn-hover-primary">Send Message  </button>
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

                                    <img className="shape" src="assets/images/shape/shape-11.png" alt="" />

                                    <div className="single-info">
                                        <h3 className="info-title">Phone:</h3>

                                        <p>(765) 388-2142</p>
                                        <p>(304) 855-3859</p>
                                    </div>
                                    <div className="single-info">
                                        <h3 className="info-title">Email:</h3>

                                        <p>example@gmail.com</p>
                                        <p>yourmail@gmail.com</p>
                                    </div>
                                    <div className="single-info">
                                        <h3 className="info-title">Address:</h3>

                                        <p>1229 Roma Ct San Jacinto, California(CA), 92583</p>
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