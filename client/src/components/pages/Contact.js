import React from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import ContactForm from "../ContactForm";
import Footer from "../Footer";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'Me contacter'
        }
    }

    render() {
        const {data} = this.state;
        return (
            <>
            <Header />
            <Breadcrumb title={data} />
            <ContactForm />
            <Footer />
            </>
        )
    }
}
 
export default Contact;