import React from 'react';
import './Breadcrumb.css'

class Breadcrumb extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.title
        }
    }

    render() {
        const {data} = this.state;
        return(
            <div className="section page-banner-section breadcrumb-img">
                <div className="container">
                    <div className="page-banner-content">
                        <h2 className="page-title">{data}</h2>

                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Accueil</a></li>
                            <li className="breadcrumb-item active">{data}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Breadcrumb