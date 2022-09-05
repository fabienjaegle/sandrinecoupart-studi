import React from 'react';
import Header from "../Header"
import Footer from "../Footer"
import RecipesList from "../RecipesList"
import Breadcrumb from "../Breadcrumb"

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'Mes recettes'
        }
    }

    render () {
        const {data} = this.state;
        return(
            <>
            <Header />
            <Breadcrumb title={data} />
            <RecipesList />
            <Footer />
            </>
        )
    }
}

export default Recipes