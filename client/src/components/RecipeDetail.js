import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMortarPestle, faFireBurner, faBed } from '@fortawesome/free-solid-svg-icons'

const RecipeDetail = (props) => {
    const [activeTab, setActiveTab] = useState("directions");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleTabDirections = () => {
        setActiveTab("directions");
    };
    const handleTabReviews = () => {
        setActiveTab("reviews");
    };
    
    const item = props.recipe;
    const globalRate = props.reviewCount[0].globalRate;

    return (
        <div className="section pt-4">
            <div className="container pb-4">   
                <div className="courses-details-wrapper">
                    <div className="row flex-row-reverse gx-xxl-5">
                        <div className="col-lg-8">
                            <div className="courses-details">
                                <div className="courses-details-images">
                                    <img src={`/${item.featuredImage}`} alt={item.title} />
                                    {item.categories.map((category) => (
                                        <span key={category.id} className="tags">{category.category}</span>
                                    ))}
                                </div>

                                <h2 className="title">{item.title}</h2>

                                <div className="courses-details-admin">
                                    <div className="admin-rating">
                                        <span className="rating-count">{globalRate}</span>
                                        <span className="rating-star">
                                        <span className="rating-bar" style={{width: globalRate * 100 / 5 + '%'}}></span>
                                        </span>
                                    </div>
                                </div>

                                <p>{item.description}</p>

                                <div className="courses-details-tab">
                                    <div className="details-tab-menu">
                                        <ul className="nav justify-content-center">
                                            <li><button className={activeTab === "directions" ? "active" : ""} onClick={handleTabDirections}>Etapes</button></li>
                                            <li><button className={activeTab === "reviews" ? "active" : ""} onClick={handleTabReviews}>Avis</button></li>
                                        </ul>
                                    </div>

                                    <div className="details-tab-content">
                                        <div className="tab-content">
                                        
                                            <div className={activeTab === "directions" ? "tab-pane fade show active" : "tab-pane fade"} id="directions">
                                                <div className="tab-description">
                                                    <div className="description-wrapper">
                                                        <p>{item.directions}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeTab === "reviews" ? "tab-pane fade show active" : "tab-pane fade"} id="reviews">
                                                <div className="tab-reviews">
                                                    {
                                                        item.reviews.map((review) => (
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
                                                        <button type="button" className="btn btn-dark btn-hover-primary" onClick={handleShow}>Ecrire un avis</button>
                                                    </div>
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Ajouter un avis</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                        <form action="#">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="single-form">
                                                                        <input type="text" placeholder="Entrez votre nom" />
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
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="single-form">
                                                                        <textarea placeholder="Ecrivez votre commentaire ici"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="single-form">
                                                                        <button className="btn btn-dark btn-hover-primary">Envoyer</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Fermer
                                                        </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    {/*<div className="modal fade" id="reviewsModal">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title">Ajouter un avis</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>

                                                                <div className="modal-body reviews-form">
                                                                    <form action="#">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="single-form">
                                                                                    <input type="text" placeholder="Enter your name" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="single-form">
                                                                                    <input type="text" placeholder="Enter your Email" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="reviews-rating">
                                                                                    <label>Rating</label>
                                                                                    <ul id="rating" className="rating">
                                                                                        <li className="star" title="Poor" data-value="1"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Poor" data-value="2"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Poor" data-value="3"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Poor" data-value="4"><i className="icofont-star"></i></li>
                                                                                        <li className="star" title="Poor" data-value="5"><i className="icofont-star"></i></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="single-form">
                                                                                    <textarea placeholder="Write your comments here"></textarea>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="single-form">
                                                                                    <button className="btn btn-dark btn-hover-primary">Envoyer</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>*/}
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
                                            <li><FontAwesomeIcon icon={faMortarPestle} /> <strong>Temps de préparation (en min)</strong> <span>{item.prepTimeInMinutes}</span></li>
                                            <li><FontAwesomeIcon icon={faFireBurner} /> <strong>Temps de cuisson (en min)</strong> <span>{item.cookTimeInMinutes}</span></li>
                                            <li><FontAwesomeIcon icon={faBed} /> <strong>Temps de repos (en min)</strong> <span>{item.restTimeInMinutes}</span></li>
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

export default RecipeDetail;