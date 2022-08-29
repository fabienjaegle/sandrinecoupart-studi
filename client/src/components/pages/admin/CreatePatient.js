import React, { useEffect, useState } from "react";
import {Formik, Field, FieldArray, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.css";

const CreatePatient = () => {
  const validationSchema = Yup.object({
    lastname: Yup.string().required('Veuillez entrer un nom'),
    firstname: Yup.string().required('Veuillez entrer un prénom'),
    email: Yup
      .string()
      .email()
      .required('Veuillez entrer une adresse mail'),
    username: Yup.string().required('Veuillez entrer un nom d\'utilisateur'),
    password: Yup
      .string()
      .required('Veuillez entrer un mot de passe')
      .matches(
        "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
        "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial"
      ),
    confirmPassword: Yup
      .string()
      .required('Veuillez confirmer le mot de passe')
      .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre"),
  });

  const initialValues = {
    lastname: "",
    firstname: "",
    email : "",
    username: "",
    password: "",
    confirmPassword : "",
    tags: []
  };

  const handleSubmit = (values) => {
    console.log(values)
  };

  const [allergens, setAllergens] = useState([])

  const fetchData = () => {
    fetch('http://localhost:5000/allergens')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAllergens(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 pt-3">
          <h1 className="text-center">Créer un patient</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ resetForm, values }) => (
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
                <div className="form-group mb-3">
                  <label htmlFor="password">Mot de passe :</label>
                  <Field type="password" id="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                  <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Allergies :</label>
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
                                checked={values.tags.includes(allergen.allergen)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    arrayHelpers.push(allergen.allergen);
                                  } else {
                                    const idx = values.tags.indexOf(allergen.allergen);
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
                    <ErrorMessage name="tags" component="small" className="text-danger" />
                  </div>
                  
                  <div className="form-group d-flex justify-content-end gap-3 mb-3">
                    <a className="btn btn-light" href="/dashboard">Retour</a>
                    <button type="submit" className="btn btn-secondary">Créer</button>
                    <button type="button" onClick={resetForm} className="btn btn-primary">Reset</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  };

export default CreatePatient;