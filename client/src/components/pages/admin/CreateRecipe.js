import React, { useEffect, useState } from "react";
import {Formik, Field, FieldArray, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.css";
import UserService from "../../../services/user.service";

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
        allergens: [],
        diets: []
    };

    const [allergens, setAllergens] = useState([]);
    const [diets, setDiets] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetchAllergensData();
      fetchDietsData();
    }, [])

    const fetchAllergensData = () => {
      UserService.getAllergens()
        .then(response => {
          setAllergens(response.data);
        })
    }
  
    const fetchDietsData = () => {
      UserService.getDiets()
        .then(response => {
          setDiets(response.data);
        })
    }

    const handleSubmit = (values, resetForm) => {
        UserService.postNewRecipe(values).then(response => {
            if (response.status === 200) {
              setInfo(response.data.msg);
            } else {
              setError(response.data.msg);
            }
            resetForm({values: ''});
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Créer une recette</h1>
                    {info ? 
                        <div class="alert alert-success" role="alert">
                        {info}
                        </div> : ''
                    }
                    {error ? 
                        <div class="alert alert-danger" role="alert">
                        {error}
                        </div> : ''
                    }
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}>
                        {({ resetForm, values }) => (
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
                                {/*<div className="form-group mb-3">
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
                                </div>*/}
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
                                <div className="row">
                                    <div className="col-6 form-group mb-5">
                                        <label htmlFor="allergens">Allergènes :</label>
                                        <FieldArray
                                            name="allergens"
                                            render={arrayHelpers => (
                                            <div>
                                                {allergens.map(allergen => (
                                                <label key={allergen.id}>
                                                    <input
                                                    name="allergens"
                                                    type="checkbox"
                                                    value={allergen}
                                                    checked={values.allergens.includes(allergen.id)}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            arrayHelpers.push(allergen.id);
                                                        } else {
                                                            const idx = values.allergens.indexOf(allergen.id);
                                                            arrayHelpers.remove(idx);
                                                        }
                                                    }}
                                                    />
                                                    <span>{allergen.allergen}</span>
                                                </label>
                                                ))}
                                            </div>
                                            )}
                                        />
                                        <ErrorMessage name="allergens" component="small" className="text-danger" />
                                    </div>
                                    
                                    <div className="col-6 form-group mb-5">
                                        <label htmlFor="diets">Régimes :</label>
                                        <FieldArray
                                            name="diets"
                                            render={arrayHelpers => (
                                            <div>
                                                {diets.map(diet => (
                                                <label key={diet.id}>
                                                    <input
                                                    name="diets"
                                                    type="checkbox"
                                                    value={diet}
                                                    checked={values.diets.includes(diet.id)}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            arrayHelpers.push(diet.id);
                                                        } else {
                                                            const idx = values.diets.indexOf(diet.id);
                                                            arrayHelpers.remove(idx);
                                                        }
                                                    }}
                                                    />
                                                    <span>{diet.diet}</span>
                                                </label>
                                                ))}
                                            </div>
                                            )}
                                        />
                                        <ErrorMessage name="diets" component="small" className="text-danger" />
                                    </div>
                                </div>
                                <div className="form-group d-flex justify-content-end gap-3 mb-3">
                                    <a className="btn btn-light" href="/admin">Retour</a>
                                    <button type="submit" className="btn btn-secondary">Créer</button>
                                    <button type="button" onClick={resetForm} className="btn btn-primary">Reset</button>
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