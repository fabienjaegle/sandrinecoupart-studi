import api from "./api";
const getUsers = () => {
  return api.get("/users");
}
const getPatients = () => {
  return api.get("/patients");
}
const getPatient = (id) => {
  return api.get(`/patients/${id}`)
}
const updatePatient = (values) => {
  return api.put("/patients/update", {
    lastname: values.lastname,
    firstname: values.firstname,
    email: values.email,
    username: values.username,
    //password: values.password,
    //confPassword: values.confPassword,
    allergens: values.allergens,
    diets: values.diets
  })
}
const getAllergens = () => {
  return api.get("/allergens");
}
const getDiets = () => {
  return api.get("/diets");
}
const getRecipes = () => {
  return api.get("/recipes");
}
const postNewUser = (values) => {
  return api.post("/user", {
    lastname: values.lastname,
    firstname: values.firstname,
    email: values.email,
    username: values.username,
    password: values.password,
    confPassword: values.confPassword,
    isPatient: values.isPatient,
    allergens: values.allergens,
    diets: values.diets
  });
}
const postNewReview = (values) => {
  return api.post("/review", {
    name: values.name,
    comment: values.comment,
    rate: values.rate,
    recipeid: values.recipeid
  })
}
const postNewContact = (values) => {
  return api.post("/contact", {
    values: values
  })
}
const UserService = {
  getUsers,
  getPatients,
  getPatient,
  updatePatient,
  getAllergens,
  getDiets,
  getRecipes,
  postNewUser,
  postNewReview,
  postNewContact
};
export default UserService;