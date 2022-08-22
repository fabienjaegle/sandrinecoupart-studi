import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../Header";
import RecipeDetail from '../RecipeDetail';
import Footer from "../Footer";
import Breadcrumb from "../Breadcrumb";

function Recipe(props) {
    const { id } = useParams();

    //const {data} = this.state;
    return(
        <>
        <Header />
        <Breadcrumb title={'test'} />
        <RecipeDetail id={id} />
        <Footer />
        </>
    )
}

export default Recipe