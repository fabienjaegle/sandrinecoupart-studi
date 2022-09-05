import React, { Component } from "react";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMortarPestle, faFireBurner, faBed } from '@fortawesome/free-solid-svg-icons'
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

class RecipeDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "directions",
            show: false,
            recipe: null,
            reviews: [],
            globalRate: null,
            info: '',
            error: '',
            DataisLoaded: false
        };
    }

    validationSchema = Yup.object({
        name: Yup.string().required('Veuillez entrer votre nom'),
        comment: Yup.string().required('Veuillez entrer votre avis'),
        rate: Yup.number().integer()
        .required()
        .test(
            'Is positive?', 
            'Veuillez choisir une note', (value) => value > 0
        ),
    });

    handleClose = () => this.setState(state => ({show: false}));
    handleShow = () => this.setState(state => ({show: true}));
    handleTabDirections = () => this.setState(state => ({activeTab: "directions"}));
    handleTabReviews = () => this.setState(state => ({activeTab: "reviews"}));

    componentDidMount() {
        this.getRecipe();
        this.getReviews();
        this.getGlobalRate();
    };

    componentDidUpdate() {
        $("#rating li").on('mouseover', function(){
            var onStar = parseInt($(this).data('value'), 10);
            var siblings = $(this).parent().children('li.star');
            Array.from(siblings, function(item) {
                var value = item.dataset.value;
                var child = item.firstChild;
                if(value <= onStar) {
                    child.classList.add('hover')
                } else {
                    child.classList.remove('hover')
                }
            })
        })

        $("#rating").on('mouseleave', function(){
            var child = $(this).find('li.star i');
            Array.from(child, function(item) {
                item.classList.remove('hover');
            })
        })
    
        var that = this;
        $('#rating li').on('click', function(e) {
            var onStar = parseInt($(this).data('value'), 10);
            that.initialValues.rate = onStar;
            that.setState({rate: onStar });
            var siblings = $(this).parent().children('li.star');
            Array.from(siblings, function(item) {
                var value = item.dataset.value;
                var child = item.firstChild;
                if(value <= onStar) {
                    child.classList.remove('hover', 'hover');
                    child.classList.add('star')
                } else {
                    child.classList.remove('star');
                    child.classList.add('hover')
                }
            })
        })
    }

    initialValues = {
        name: "",
        comment: "",
        rate : 0,
        recipeid: this.props.id
      };

    addReview = (values, resetForm) => {
        UserService.postNewReview(values)
        .then((response) => {
            if (response.status === 200) {
                this.setState(state => ({
                    //Add new review to the reviews array list
                    reviews: state.reviews.concat(response.data.newReview),
                    info: response.data.info
                }))
                this.getGlobalRate(); //recalculate the global rate of the recipe.
            } else {
                this.setState(state => ({
                    error: response.data.msg
                }))
            }

            this.handleClose();
        });
    }

    getRecipe = () => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            axios.post('http://localhost:5000/recipes/private/full', {
                recipeid: this.props.id,
                userid: currentUser.id
            }).then((response) => {
                this.setState(state => ({
                    recipe: response.data
                }))
            });
        } else {
            axios.post('http://localhost:5000/recipes/public/full', {
                recipeid: this.props.id
            }).then((response) => {
                this.setState(state => ({
                    recipe: response.data
                }))
            });
        }
    }

    getReviews = () => {
        axios.post('http://localhost:5000/reviews', {
            recipeid: this.props.id
        }).then((response) => {
            this.setState(state => ({
                reviews: response.data
            }))
        })
    }
    
    getGlobalRate = () => {
        axios.post('http://localhost:5000/review/globalRate', {
            recipeid: this.props.id
        }).then((response) => {
            this.setState(state => ({
                globalRate: response.data.globalRate
            }))
        })
    }

    render() {
        const { recipe, globalRate, reviews, activeTab, show } = this.state;

        return (
            <div className="section pt-4">
                <div className="container pb-4">   
                    <div className="courses-details-wrapper">
                        <div className="row flex-row-reverse gx-xxl-5">
                            <div className="col-lg-8">
                                <div className="courses-details">
                                    <div className="courses-details-images">
                                        <img src={`/${recipe?.featuredImage}`} alt={recipe?.title} />
                                        {recipe?.categories?.map((category) => (
                                            <span key={category.id} className="tags">{category.category}</span>
                                        ))}
                                    </div>

                                    <h2 className="title">{recipe?.title}</h2>

                                    <div className="courses-details-admin">
                                        <div className="admin-rating">
                                            <span className="rating-count">{globalRate}</span>
                                            <span className="rating-star">
                                            <span className="rating-bar" style={{width: globalRate * 100 / 5 + '%'}}></span>
                                            </span>
                                        </div>
                                    </div>

                                    <p>{recipe?.description}</p>

                                    <div className="courses-details-tab">
                                        <div className="details-tab-menu">
                                            <ul className="nav justify-content-center">
                                                <li><button className={activeTab === "directions" ? "active" : ""} onClick={this.handleTabDirections}>Etapes</button></li>
                                                <li><button className={activeTab === "reviews" ? "active" : ""} onClick={this.handleTabReviews}>Avis</button></li>
                                            </ul>
                                        </div>

                                        <div className="details-tab-content">
                                            <div className="tab-content">
                                            
                                                <div className={activeTab === "directions" ? "tab-pane fade show active" : "tab-pane fade"} id="directions">
                                                    <div className="tab-description">
                                                        <div className="description-wrapper">
                                                            <p>{recipe?.directions}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={activeTab === "reviews" ? "tab-pane fade show active" : "tab-pane fade"} id="reviews">
                                                    <div className="tab-reviews">
                                                        {
                                                            reviews.map((review) => (
                                                                <div key={review.id} className="single-review mb-4" role="group">
                                                                    <div className="review-author">
                                                                        <div className="author-content">
                                                                            <h4 className="name">{review.name}</h4>
                                                                            <span className="rating-star">
                                                                                <span className="rating-bar" style={{width: (review.rate * 100 / 5) + '%'}}></span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <p>{review.comment}</p>
                                                                </div>
                                                            ))
                                                        }

                                                        <div className="reviews-btn">
                                                            <button type="button" className="btn btn-dark btn-hover-primary" onClick={this.handleShow}>Ecrire un avis</button>
                                                        </div>
                                                        <Modal show={show} onHide={this.handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Ajouter un avis</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <Formik
                                                                initialValues={this.initialValues}
                                                                validationSchema={this.validationSchema}
                                                                onSubmit={(values, {resetForm}) => this.addReview(values, resetForm)}>
                                                                {({ resetForm, values }) => (
                                                                    <Form>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="single-form">
                                                                                    <Field type="text" placeholder="Entrez votre nom" id="name" name="name" />
                                                                                    <ErrorMessage name="name" component="small" className="text-danger" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="reviews-rating">
                                                                                    <label>Votre note</label>
                                                                                    <ul id="rating" className="rating">
                                                                                        <li className="star" title="Horrible" data-value="1"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Pas bon" data-value="2"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Moyen" data-value="3"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Très bon" data-value="4"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Excellent" data-value="5"><i className="icofont-star"></i></li>
                                                                                    </ul>
                                                                                    <ErrorMessage name="rate" component="small" className="text-danger" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="single-form">
                                                                                    <Field
                                                                                        as="textarea"
                                                                                        id="comment"
                                                                                        name="comment"
                                                                                    />
                                                                                </div>
                                                                                <ErrorMessage name="comment" component="small" className="text-danger" />
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="single-form">
                                                                                    <button type="submit" className="btn btn-dark btn-hover-primary">Envoyer</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Form>
                                                                )}
                                                                </Formik>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                            <Button variant="secondary" onClick={this.handleClose}>
                                                                Fermer
                                                            </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="sidebar">
                                    <div className="sidebar-widget widget-information">
                                        <div className="info-price">
                                            <span className="price">Détails</span>
                                        </div>
                                        <div className="info-list">
                                            <ul>
                                                <li><FontAwesomeIcon icon={faMortarPestle} /> <strong>Temps de préparation (en min)</strong> <span>{recipe?.prepTimeInMinutes}</span></li>
                                                <li><FontAwesomeIcon icon={faFireBurner} /> <strong>Temps de cuisson (en min)</strong> <span>{recipe?.cookTimeInMinutes}</span></li>
                                                <li><FontAwesomeIcon icon={faBed} /> <strong>Temps de repos (en min)</strong> <span>{recipe?.restTimeInMinutes}</span></li>
                                            </ul>
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
}

export default RecipeDetail;