import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.css";

const CreateRecipe = () => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Veuillez entrer un titre"),
        description: Yup.string().required("Veuillez entrer une description"),
        ingredients: Yup.string().required("Veuillez entrer des ingrédients"),
        directions: Yup.string().required("Veuillez entrer les étapes"),
    });

    const initialValues = {
        title: "",
        featuredImage: "",
        description: "",
        ingredients: "",
        directions: "",
        prepTimeInMinutes: 0,
        restTimeInMinutes: 0,
        cookTimeInMinutes: 0,
        forPatient: false,
    };

    const handleSubmit = (values) => {
        console.log(values)
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Créer une recette</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="title">
                                        Titre :
                                    </label>
                                    <Field
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="featuredImage">
                                        Image :
                                    </label>
                                    <Field
                                        type="file"
                                        id="featuredImage"
                                        name="featuredImage"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="featuredImage"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description">
                                        Description :
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="ingredients">
                                        Ingrédients :
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="ingredients"
                                        name="ingredients"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="ingredients"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="directions">
                                        Etapes :
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="directions"
                                        name="directions"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="directions"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="prepTimeInMinutes">
                                        Temps de préparation :
                                    </label>
                                    <Field
                                        type="number"
                                        id="prepTimeInMinutes"
                                        name="prepTimeInMinutes"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="prepTimeInMinutes"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="cookTimeInMinutes">
                                        Temps de cuisson :
                                    </label>
                                    <Field
                                        type="number"
                                        id="cookTimeInMinutes"
                                        name="cookTimeInMinutes"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="cookTimeInMinutes"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="restTimeInMinutes">
                                        Temps de repos :
                                    </label>
                                    <Field
                                        type="number"
                                        id="restTimeInMinutes"
                                        name="restTimeInMinutes"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="restTimeInMinutes"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group form-check mb-5">
                                    <Field
                                        name="forPatient"
                                        type="checkbox"
                                        className="form-check-input"
                                    />
                                    <label
                                        htmlFor="forPatient"
                                        className="form-check-label"
                                    >
                                        Pour les patients uniquement ?
                                    </label>
                                    <ErrorMessage
                                        name="forPatient"
                                        component="small"
                                        className="text-danger d-block"
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-end gap-3 mb-3">
                                    <a className="btn btn-light" href="/dashboard">Retour</a>
                                    <button
                                        type="submit"
                                        className="btn btn-secondary"
                                    >
                                        Créer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="btn btn-primary"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe