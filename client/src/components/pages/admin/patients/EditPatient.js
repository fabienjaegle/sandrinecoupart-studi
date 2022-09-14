import React, { useEffect, useState } from "react";
import {Formik, Field, FieldArray, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.css";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router-dom";

const EditPatient = () => {
  const { id } = useParams();

  const validationSchema = Yup.object({
    lastname: Yup.string().required('Veuillez entrer un nom'),
    firstname: Yup.string().required('Veuillez entrer un prénom'),
    email: Yup
      .string()
      .email('L\'adresse mail doit être valide')
      .required('Veuillez entrer une adresse mail'),
    username: Yup.string().required('Veuillez entrer un nom d\'utilisateur'),
    /*password: Yup
      .string()
      .required('Veuillez entrer un mot de passe'),
    confPassword: Yup
      .string()
      .required('Veuillez confirmer le mot de passe')
      .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre"),*/
  });

  const initialValues = {
    lastname: "",
    firstname: "",
    email : "",
    username: "",
    //password: "",
    //confPassword : "",
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

    UserService.getPatient(id).then(response => {
      initialValues.lastname = response.data.lastname;
      initialValues.firstname = response.data.firstname;
      initialValues.username = response.data.username;
      initialValues.email = response.data.email;
      initialValues.allergens = response.data.allergens;
      initialValues.diets = response.data.diets;
      console.log(initialValues);
    });
  }, [id])

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

  const handleSubmit = (values) => {
    console.log(values);
    UserService.updatePatient(values).then(response => {
      console.log(response.data.msg);
      if (response.status === 200) {
        setInfo(response.data.msg);
      } else {
        setError(response.data.msg);
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 pt-3">
          <h1 className="text-center">Editer un patient</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}>
            {({ values }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="lastname">Nom :</label>
                  <Field type="text" id="lastname" name="lastname" className="form-control" />
                  <ErrorMessage name="lastname" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="firstname">Prénom :</label>
                  <Field type="text" id="firstname" name="firstname" className="form-control" />
                  <ErrorMessage name="firstname" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Adresse mail :</label>
                  <Field type="email" id="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="username">Nom d'utilisateur :</label>
                  <Field type="text" id="username" name="username" className="form-control" />
                  <ErrorMessage name="username" component="small" className="text-danger" />
                </div>
                {/*<div className="form-group mb-3">
                  <label htmlFor="password">Mot de passe :</label>
                  <Field type="password" id="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confPassword">Confirmer le mot de passe :</label>
                  <Field type="password" id="confPassword" name="confPassword" className="form-control" />
                  <ErrorMessage name="confPassword" component="small" className="text-danger" />
                </div>*/}
                <div className="row">
                  <div className="col-6 form-group mb-5">
                      <label htmlFor="allergens">Allergies :</label>
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
                                  checked={values.allergens.some(item => item.id === allergen.id)}
                                  onChange={e => {
                                      if (e.target.checked) {
                                        arrayHelpers.push(allergen);
                                      } else {
                                        const idx = values.allergens.map(e => e.id).indexOf(allergen.id);
                                        arrayHelpers.remove(idx);
                                      }
                                  }}
                                  />
                                  <span>&nbsp;{allergen.allergen}</span>
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
                                  checked={values.diets.some(item => item.id === diet.id)}
                                  onChange={e => {
                                      if (e.target.checked) {
                                        arrayHelpers.push(diet);
                                      } else {
                                        const idx = values.diets.map(e => e.id).indexOf(diet.id);
                                        arrayHelpers.remove(idx);
                                      }
                                  }}
                                  />
                                  <span>&nbsp;{diet.diet}</span>
                              </label>
                              ))}
                          </div>
                          )}
                      />
                      <ErrorMessage name="diets" component="small" className="text-danger" />
                  </div>
              </div>
              {info ? 
                <div className="alert alert-success" role="alert">
                  {info}
                </div> : ''
              }
              {error ? 
                <div className="alert alert-danger" role="alert">
                  {error}
                </div> : ''
              }
              <div className="form-group d-flex justify-content-end gap-3 mb-3">
                <a className="btn btn-light" href="/admin/patients/list">Retour</a>
                <button type="submit" className="btn btn-secondary">Modifier</button>
              </div>
              </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  };

export default EditPatient;