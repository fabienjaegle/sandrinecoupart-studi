import React, { useState } from "react";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import UserService from "../services/user.service";

const ContactForm = () => {

    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const validationSchema = Yup.object({
        name: Yup.string().required('Veuillez entrer votre nom'),
        email: Yup
          .string()
          .email('L\'adresse mail doit être valide')
          .required('Veuillez entrer une adresse mail'),
        subject: Yup.string().required('Veuillez entrer un sujet'),
        message: Yup
          .string()
          .required('Veuillez entrer un message')
    });

    const initialValues = {
        name: "",
        email : "",
        subject: "",
        message: ""
    };

    const addContact = (values, resetForm) => {
        UserService.postNewContact(values).then(response => {
          if (response.status === 200) {
            setInfo("Votre message a bien été envoyé. Nous prendrons contact très prochainement.");
          }else {
            setError("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ultérieurement.");
          }
          resetForm({values: ''});
        });
    };

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="contact-content">
                                <div className="contact-title">
                                    <h4 className="sub-title">Pas d'inquétude !</h4>
                                    <h2 className="main-title">Vous avez une question ? Contactez-moi.</h2>
                                </div>
                                <div className="form-shuvo">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={(values, {resetForm}) => addContact(values, resetForm)}>
                                        {({ resetForm, values }) => (
                                            <Form className="contact-form wow fadeInLeft" id="reused_form">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group mt-2">
                                                            <Field type="text" className="form-control" name="name" id="name" placeholder="Votre nom" />
                                                            <ErrorMessage name="name" component="small" className="text-danger" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group mt-2">
                                                            <Field type="email" className="form-control" name="email" id="email" placeholder="Votre adresse mail" />
                                                            <ErrorMessage name="email" component="small" className="text-danger" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mt-2">
                                                            <Field type="text" className="form-control" name="subject" id="subject" placeholder="Votre sujet" />
                                                            <ErrorMessage name="subject" component="small" className="text-danger" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mt-2">
                                                            <Field
                                                                as="textarea"
                                                                id="message"
                                                                name="message"
                                                                rows="4"
                                                                placeholder="Votre message..."
                                                            />
                                                            <ErrorMessage name="message" component="small" className="text-danger" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 text-left mt-4">
                                                        <button type="submit" className="btn btn-secondary btn-hover-primary">Envoyer</button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                {info ? 
                                    <div id="success_message" className="col-md-12 text-success pt-5">
                                    <p>{info}</p>
                                    </div> : ''
                                }
                                {error ? 
                                    <div id="error_message" className="col-md-12">
                                        <p>Erreur</p> {error}
                                    </div> : ''
                                }
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-information">
                                <div className="information-wrapper">
                                    <div className="single-info">
                                        <h3 className="info-title">Téléphone :</h3>
                                        <p>06 12 23 45 56</p>
                                    </div>
                                    <div className="single-info">
                                        <h3 className="info-title">Adresse mail :</h3>
                                        <p>contact@sandrine-coupart.com</p>
                                    </div>
                                    <div className="single-info">
                                        <h3 className="info-title">Adresse :</h3>
                                        <p>4 quai de l'Orne, 14118 Caen</p>
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

export default ContactForm;