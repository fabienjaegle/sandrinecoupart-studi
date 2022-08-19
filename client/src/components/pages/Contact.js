import React from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
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

            <Footer />
            </>
        )
    }
}
 
export default Contact;