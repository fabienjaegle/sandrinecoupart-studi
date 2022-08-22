import React from "react";

class RecipesList extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/recipes/public/excerpt")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <p> Chargement des recettes en cours...</p> </div> ;

        return (
            <div className="section section-padding bg-grey">
                <div className="container">
                    <div className="section-title">
                        <h6 className="sub-title">Recettes santé</h6>
                        <h2 className="main-title">Mes dernières recettes</h2>
                    </div>

                    <div className="courses-wrapper">
                        <div className="row gx-xxl-5">
                        {
                            items.map((item) => (
                                <div key={item.id} className="col-lg-4 col-sm-6">
                                    <div className="single-courses">
                                        <div className="courses-images">
                                            <a href={`/recipe/${item.id}`}><img src={`${item.featuredImage}`} alt={`${item.title}`} /></a>
                                        </div>
                                        <div className="courses-content">
                                            <div className="courses-price">
                                                <span className="price"><i className="fa-solid fa-seedling"></i></span>
                                            </div>
                                            <div className="content-wrapper">
                                                <h4 className="title"><a href={`/recipe/${item.id}`}>{item.title}</a></h4>
                                                <ul className="meta">
                                                    <li><i className="fa-solid fa-mortar-pestle"></i> {item.prepTimeInMinutes} min</li>
                                                    <li><i className="fa-solid fa-oven"></i> {item.cookTimeInMinutes} min</li>
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
        )
    }
}

export default RecipesList;