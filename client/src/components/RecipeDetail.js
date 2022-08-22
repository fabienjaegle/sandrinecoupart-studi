import React from "react";
import axios from 'axios';

class RecipeDetail extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            recipeId: this.props.id,
            item: {},
            DataIsLoaded: false
        };
    }

    componentDidMount() {
        try {
            axios.post('http://localhost:5000/recipes/public/full', {
                recipeid: this.state.recipeId
            })
            .then((res) => res.data)
            .then((json) => {
                this.setState({
                    item: json,
                    DataIsLoaded: true
                });
            });
        } catch (error) {
            if (error.response) {
                //setMsg(error.response.data.msg);
            }
        }
    }
    render() {
        const { DataIsLoaded, item } = this.state;
        return (
            <div className="section pt-4">
            <div className="container pb-4">
                {!DataIsLoaded ? <h2>Chargement en cours...</h2> : 
                    <div className="courses-details-wrapper">
                        <div className="row flex-row-reverse gx-xxl-5">
                            <div className="col-lg-8">
                                <div className="courses-details">
                                    <div className="courses-details-images">
                                        <img src={`${item.featuredImage}`} alt={item.title} />
                                        <span className="tags">Finance</span>
                                    </div>

                                    <h2 className="title">{item.title}</h2>

                                    <div className="courses-details-admin">
                                        <div className="admin-rating">
                                            <span className="rating-count">4.9</span>
                                            <span className="rating-star">
                                            <span className="rating-bar" style={{width: 80 + '%'}}></span>
                                            </span>
                                            <span className="rating-text">(5,764 Rating)</span>
                                        </div>
                                    </div>

                                    <div className="courses-details-tab">
                                        <div className="details-tab-menu">
                                            <ul className="nav justify-content-center">
                                                <li><button className="active" data-bs-toggle="tab" data-bs-target="#description">Description</button></li>
                                                <li><button data-bs-toggle="tab" data-bs-target="#reviews">Reviews</button></li>
                                            </ul>
                                        </div>

                                        <div className="details-tab-content">
                                            <div className="tab-content">
                                                <div className="tab-pane fade show active" id="description">
                                                    <div className="tab-description">
                                                        <div className="description-wrapper">
                                                            <h3 className="tab-title">Description:</h3>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="reviews">
                                                    <div className="tab-reviews">
                                                        <h3 className="tab-title">Student Reviews:</h3>
{/*
                                                        <div className="reviews-wrapper reviews-active">
                                                            <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                                                                <div className="swiper-wrapper" id="swiper-wrapper-222bef7cfec6b22c" aria-live="off" style="transform: translate3d(-2394px, 0px, 0px); transition-duration: 0ms;"><div className="single-review swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="2" style="width: 768px; margin-right: 30px;" role="group" aria-label="1 / 5">
                                                                        <div className="review-author">
                                                                            <div className="author-thumb">
                                                                                <img src="assets/images/author/author-03.jpg" alt="Author" />
                                                                                <i className="icofont-quote-left"></i>
                                                                            </div>
                                                                            <div className="author-content">
                                                                                <h4 className="name">Gertude Culbertson</h4>
                                                                                <span className="designation">Product Designer, USA</span>
                                                                                <span className="rating-star">
                                                                                <span className="rating-bar" style={{width: 80 + '%'}}></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
                                                                    </div>

                                                                    <div className="single-review swiper-slide swiper-slide-duplicate-next" data-swiper-slide-index="0" style="width: 768px; margin-right: 30px;" role="group" aria-label="2 / 5">
                                                                        <div className="review-author">
                                                                            <div className="author-thumb">
                                                                                <img src="assets/images/author/author-06.jpg" alt="Author" />
                                                                                <i className="icofont-quote-left"></i>
                                                                            </div>
                                                                            <div className="author-content">
                                                                                <h4 className="name">Sara Alexander</h4>
                                                                                <span className="designation">Product Designer, USA</span>
                                                                                <span className="rating-star">
                                                                                <span className="rating-bar" style={{width: 80 + '%'}}></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
                                                                    </div>

                                                                    <div className="single-review swiper-slide swiper-slide-prev" data-swiper-slide-index="1" style="width: 768px; margin-right: 30px;" role="group" aria-label="3 / 5">
                                                                        <div className="review-author">
                                                                            <div className="author-thumb">
                                                                                <img src="assets/images/author/author-07.jpg" alt="Author" />
                                                                                <i className="icofont-quote-left"></i>
                                                                            </div>
                                                                            <div className="author-content">
                                                                                <h4 className="name">Karol Bachman</h4>
                                                                                <span className="designation">Product Designer, USA</span>
                                                                                <span className="rating-star">
                                                                                <span className="rating-bar" style={{width: 60 + '%'}}></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
                                                                    </div>

                                                                    <div className="single-review swiper-slide swiper-slide-active" data-swiper-slide-index="2" style="width: 768px; margin-right: 30px;" role="group" aria-label="4 / 5">
                                                                        <div className="review-author">
                                                                            <div className="author-thumb">
                                                                                <img src="assets/images/author/author-03.jpg" alt="Author" />
                                                                                <i className="icofont-quote-left"></i>
                                                                            </div>
                                                                            <div className="author-content">
                                                                                <h4 className="name">Gertude Culbertson</h4>
                                                                                <span className="designation">Product Designer, USA</span>
                                                                                <span className="rating-star">
                                                                                <span className="rating-bar" style={{width: 80 + '%'}}></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
                                                                    </div>

                                                                    <div className="single-review swiper-slide swiper-slide-duplicate swiper-slide-next" data-swiper-slide-index="0" style="width: 768px; margin-right: 30px;" role="group" aria-label="5 / 5">
                                                                        <div className="review-author">
                                                                            <div className="author-thumb">
                                                                                <img src="assets/images/author/author-06.jpg" alt="Author" />
                                                                                <i className="icofont-quote-left"></i>
                                                                            </div>
                                                                            <div className="author-content">
                                                                                <h4 className="name">Sara Alexander</h4>
                                                                                <span className="designation">Product Designer, USA</span>
                                                                                <span className="rating-star">
                                                                                <span className="rating-bar" style={{width: 80 + '%'}}></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"><span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 1"></span><span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 2"></span><span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 3"></span></div>
                                                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                                        </div>
*/}
                                                        <div className="reviews-btn">
                                                            <button type="button" className="btn btn-dark btn-hover-primary" data-bs-toggle="modal" data-bs-target="#reviewsModal">Write A Review</button>
                                                        </div>

                                                        <div className="modal fade" id="reviewsModal">
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title">Add a Review</h5>
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
                                                                                        <button className="btn btn-dark btn-hover-primary">Submit Review</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                            <span className="price">$420.38</span>
                                        </div>
                                        <div className="info-list">
                                            <ul>
                                                <li><i className="icofont-man-in-glasses"></i> <strong>Instructor</strong> <span>Pamela Foster</span></li>
                                                <li><i className="icofont-clock-time"></i> <strong>Duration</strong> <span>08 hr 15 mins</span></li>
                                                <li><i className="icofont-ui-video-play"></i> <strong>Lectures</strong> <span>29</span></li>
                                                <li><i className="icofont-bars"></i> <strong>Level</strong> <span>Secondary</span></li>
                                                <li><i className="icofont-book-alt"></i> <strong>Language</strong> <span>English</span></li>
                                                <li><i className="icofont-certificate-alt-1"></i> <strong>Certificate</strong> <span>Yes</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        )
    }
}

export default RecipeDetail;