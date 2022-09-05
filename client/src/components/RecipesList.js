import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faMortarPestle, faFireBurner } from '@fortawesome/free-solid-svg-icons'
import AuthService from '../services/auth.service';

class RecipesList extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            try {
                axios.post('http://localhost:5000/recipes/private/excerpt', {
                    userid: currentUser.userId
                })
                .then((res) => res.data)
                .then((json) => {
                    this.setState({
                        items: json,
                        DataIsLoaded: true
                    });
                });
            } catch (error) {
                if (error.response) {
                    //setMsg(error.response.data.msg);
                }
            }
        } else {
            try {
                axios.get('http://localhost:5000/recipes/public/excerpt')
                .then((res) => res.data)
                .then((json) => {
                    this.setState({
                        items: json,
                        DataIsLoaded: true
                    });
                });
            } catch (error) {
                if (error.response) {
                    //setMsg(error.response.data.msg);
                }
            }
        }
    }
    render() {
        const { DataIsLoaded, items } = this.state;
        if (!DataIsLoaded) return <div>
            <p>Chargement des recettes en cours...</p> </div> ;
        return (
            <div className="section section-padding-02 mb-4">
                <div className="container">
                    <div className="section-title">
                        <h6 className="sub-title">Recettes santé</h6>
                        <h2 className="main-title">Mes dernières recettes</h2>
                    </div>

                    <div className="section pt-4">
                        <div className="container">
                            <div className="courses-wrapper-02">
                                <div className="row gx-xxl-5">
                                {items.length === 0 ? <p className="text-center">Aucune recette</p> : ''}
                                {
                                    items.map((item) => (
                                    <div key={item.id} className="col-lg-4 col-sm-6">
                                        <div className="single-courses">
                                            <div className="courses-images">
                                                <a href={`/recipe/${item.id}`}><img src={`${item.featuredImage}`} alt={`${item.title}`} /></a>
                                            </div>
                                            <div className="courses-content">
                                                <div className="courses-price">
                                                    <span className="price"><FontAwesomeIcon icon={faSeedling} /></span>
                                                </div>
                                                <div className="content-wrapper">
                                                    <h4 className="title"><a href={`/recipe/${item.id}`}>{item.title}</a></h4>
                                                    <ul className="meta">
                                                        <li><FontAwesomeIcon icon={faMortarPestle} /> {item.prepTimeInMinutes} min</li>
                                                        <li><FontAwesomeIcon icon={faFireBurner} /> {item.cookTimeInMinutes} min</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipesList;